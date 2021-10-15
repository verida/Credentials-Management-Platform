import { BadRequestException } from '@nestjs/common';

import Verida from '@verida/datastore';
import { Wallet } from 'ethers';
import BaseHelper from './BaseHelper';
import { Network } from '@verida/client-ts';
import { Utils } from '@verida/3id-utils-node';
import { AutoAccount } from '@verida/account-node';
import CredentialHelper from './CredentialHelper';

import { CreateIssuerDto } from '../modules/issuer/dto';
import { IssuerDto } from '../modules/issuer/dto';
import { Issuer } from '../modules/issuer/interfaces/issuer.interface';
import { IssueCredentialDto } from '../modules/credential/dto';

const {
  VERIDA_APP_NAME,
  CERAMIC_URL,
  VERIDA_TESTNET_DEFAULT_SERVER,
  CREDENTIAL_DOWNLOAD_URL,
} = process.env;

export default class VeridaHelper {
  /**
   *
   * @param createIssuerDto
   */
  static async createIssuer(createIssuerDto: CreateIssuerDto) {
    const chain = 'ethr';
    const account = await VeridaHelper.generateAccount();
    const utils = new Utils(CERAMIC_URL);
    const ceramic = await utils.createAccount('3id', account.mnemonic.phrase);
    const did = ceramic.did.id;

    const issuer = new IssuerDto();
    issuer.name = createIssuerDto.name;
    issuer.chain = chain;
    issuer.did = did;
    issuer.privateKey = account.privateKey;
    issuer.publicKey = account.publicKey;
    issuer.address = account.address;
    issuer.urlName = createIssuerDto.urlName;

    return issuer;
  }

  static async setIssuerName(issuer: IssuerDto) {
    const context = await VeridaHelper.connect(issuer);
    const profileContext = await context.openProfile('public');
    const profile = await profileContext.set('name', issuer.name);
    return profile;
  }

  static async generateAccount() {
    return Wallet.createRandom();
  }

  static async validateCredential(cred: IssueCredentialDto) {
    // Validate the credential
    const schema = await Verida.getSchema(cred.data['schema']);
    const valid = await schema.validate(cred.data);

    if (!valid) {
      throw new BadRequestException(schema.errors);
    }
  }

  static async issueCredential(issuer: Issuer, cred: IssueCredentialDto) {
    // Convert the DOB to numeric only and fetch the mobile number
    const dob = cred.dob.replace(/\-/g, '');
    const mobile = cred.mobile;

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

  static async _issueEncryptedCredential(
    issuer: Issuer,
    cred: IssueCredentialDto,
    encryptionKey: Uint8Array,
  ): Promise<object> {
    // @todo: Locate issuer based on current logged in user
    const app = await VeridaHelper.connect(issuer);

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

  static async connect(issuer: IssuerDto) {
    // initialize verida server user using issuer

    const context = Network.connect({
      context: {
        name: VERIDA_APP_NAME,
      },
      client: {
        ceramicUrl: CERAMIC_URL,
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
          chain: 'ethr',
          privateKey: issuer.privateKey,
        },
      ),
    });

    return context;
  }
}
