import { BadRequestException } from '@nestjs/common';
import NodeCache from 'node-cache';

import Verida from '@verida/datastore';
import { Wallet } from 'ethers';
import BaseHelper from './BaseHelper';
import { Context, EnvironmentType, Network } from '@verida/client-ts';
import { AutoAccount } from '@verida/account-node';
import CredentialHelper from './CredentialHelper';

import { CreateIssuerDto } from '../modules/issuer/dto';
import { IssuerDto } from '../modules/issuer/dto';
import { Issuer } from '../modules/issuer/interfaces/issuer.interface';
import { IssueCredentialDto } from '../modules/credential/dto';
import { SendMessageResponse } from 'src/models/User';
import { BLOCK_CHAIN, DURATION_TTL } from '../constants/constant.config';

const {
  VERIDA_APP_NAME,
  VERIDA_TESTNET_DEFAULT_SERVER,
  CREDENTIAL_DOWNLOAD_URL,
} = process.env;

const VERIDA_ENVIRONMENT = EnvironmentType.TESTNET;

const CacheManager = new NodeCache();

export default class VeridaHelper {
  /**
   *
   * @param createIssuerDto
   */
  static async createIssuer(createIssuerDto: CreateIssuerDto) {
    const issuer = new IssuerDto();
    const account = await VeridaHelper.generateAccount();
    const context = await VeridaHelper.connect(account.privateKey);
    const did = await context.getAccount().did();

    issuer.name = createIssuerDto.name;
    issuer.chain = BLOCK_CHAIN;
    issuer.did = did;
    issuer.privateKey = account.privateKey;
    issuer.publicKey = account.publicKey;
    issuer.address = account.address;
    issuer.urlName = createIssuerDto.urlName;

    return issuer;
  }

  static async setIssuerName(issuer: IssuerDto) {
    const context = await VeridaHelper.connect(issuer.privateKey);
    const profileContext = await context.openProfile('basicProfile');

    return await profileContext.set('name', issuer.name);
  }

  private static async generateAccount() {
    return Wallet.createRandom();
  }

  static async validateCredential(cred: IssueCredentialDto) {
    const schema = await Verida.getSchema(cred.data['schema']);
    const valid = await schema.validate(cred.data);

    if (!valid) {
      throw new BadRequestException(schema.errors);
    }
  }

  static async issueCredentialV1(issuer: Issuer, cred: IssueCredentialDto) {
    // Convert the DOB to numeric only and fetch the mobile number
    const dob = cred['dob'].replace(/\-/g, '');
    const mobile = cred.data['did'];

    // Generate an encryption key for the credential that combines a
    // partial random key with the user's date of birth

    // 6 digit alpha string + credential DOB
    const randomKey = Verida.Helpers.encryption.randomKey(24);
    const randomKeyHex = Buffer.from(randomKey).toString('hex');
    const dobHex = Buffer.from(dob).toString('hex');
    const encryptionKey = new Uint8Array(
      Buffer.from(randomKeyHex + dobHex, 'hex'),
    );

    // Issue an encrypted credential
    const result = await this._issueEncryptedCredential(
      issuer,
      cred,
      encryptionKey,
    );
    const credentialId = result['result'].id;
    const vid = result['vid'];

    // Generate a URL that combines the issuer VID, credentialId and partial encryption key
    // BASE64 encode values to save space
    const uniqueId = BaseHelper.convertBase(
      credentialId.replace(/\-/g, ''),
      16,
      64,
    );
    const keyShortened = BaseHelper.convertBase(randomKeyHex, 16, 64);
    const vidShort = BaseHelper.convertBase(vid.replace(/0x/, ''), 16, 64);
    const fetchUrl =
      CREDENTIAL_DOWNLOAD_URL +
      '?v=' +
      vidShort +
      '&c=' +
      uniqueId +
      '&k=' +
      keyShortened;

    return {
      url: fetchUrl,
      mobile: mobile,
      credentialId: credentialId,
    };
  }

  /**
   *
   * @param issuer
   * @param cred
   * @returns
   *
   *  Credential Issuer without data encryption
   */

  static async issueCredential(
    issuer: Issuer,
    cred: IssueCredentialDto,
  ): Promise<SendMessageResponse> {
    const type = 'inbox/type/dataSend';

    const config = {
      recipientContextName: 'Verida: Vault',
    };
    const title = cred.data['title'];
    const context = await VeridaHelper.connect(issuer.privateKey);
    const messaging = await context.getMessaging();

    const did = cred.did;

    const contextName = VERIDA_APP_NAME;

    const jwtDID = await context
      .getAccount()
      .createDidJwt(contextName, cred.data);

    const data = {
      data: [
        {
          ...cred.data,
          didJwtVc: jwtDID,
        },
      ],
    };

    const response = await messaging.send(did, type, data, title, config);

    return response as SendMessageResponse;
  }

  static async _issueEncryptedCredential(
    issuer: Issuer,
    cred: IssueCredentialDto,
    encryptionKey: Uint8Array,
  ): Promise<object> {
    // @todo: Locate issuer based on current logged in user
    const app = await VeridaHelper.connect(issuer.privateKey);

    // Issue a new public, encrypted verida credential
    const now = new Date();
    const credIssuer = await Verida.Helpers.credentials.createIssuer(app);
    const credential = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://www.w3.org/2018/credentials/examples/v1',
      ],
      id: '',
      type: ['VerifiableCredential'],
      issuer: issuer.did,
      issuanceDate: now.toISOString(),
      credentialSubject: {
        ...cred.data,
      },
      credentialSchema: {
        id: cred.data['schema'],
        type: 'JsonSchemaValidator2018',
      },
    };

    const didJwtVc = await Verida.Helpers.credentials.createVerifiableCredential(
      credential,
      credIssuer,
    );

    const item = {
      didJwtVc: didJwtVc,
      ...cred.data,
    };

    const result = await CredentialHelper.issuePublicCredential(app, item, {
      key: encryptionKey,
    });

    return result;
  }

  private static async connect(issuerPrivateKey: string): Promise<Context> {
    const cachedContext = CacheManager.get(issuerPrivateKey);
    if (cachedContext) {
      return cachedContext as Context;
    }
    const context = await VeridaHelper.init(issuerPrivateKey);
    return context as Context;
  }

  /**
   *
   * @param issuerPrivateKey
   * @returns context instance
   */

  private static async init(issuerPrivateKey: string) {
    const context = Network.connect({
      context: {
        name: VERIDA_APP_NAME,
      },
      client: {
        environment: VERIDA_ENVIRONMENT,
      },
      account: new AutoAccount(
        {
          defaultDatabaseServer: {
            type: 'VeridaDatabase',
            endpointUri: VERIDA_TESTNET_DEFAULT_SERVER,
          },
          defaultMessageServer: {
            type: 'VeridaMessage',
            endpointUri: VERIDA_TESTNET_DEFAULT_SERVER,
          },
        },
        {
          privateKey: issuerPrivateKey,
          environment: VERIDA_ENVIRONMENT,
        },
      ),
    });

    CacheManager.set(issuerPrivateKey, context, DURATION_TTL);

    return context;
  }

  /**
   *
   * @param issuer
   * @param schemaTitle
   * @returns
   */

  static async getSchemaJSon(
    issuer: IssuerDto,
    schemaTitle: string,
  ): Promise<any> {
    try {
      const context = await VeridaHelper.connect(issuer.privateKey);
      console.log(schemaTitle);

      const schemas = await context.getClient().getSchema(schemaTitle);
      const json = await schemas.getSchemaJson();

      return json;
    } catch (error) {
      console.log({ error });
    }
  }
}
