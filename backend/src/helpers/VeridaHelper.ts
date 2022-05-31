import NodeCache from 'node-cache';
import { Wallet } from 'ethers';
import { Context, EnvironmentType, Network } from '@verida/client-ts';
import { AutoAccount } from '@verida/account-node';
import { Credentials } from "@verida/verifiable-credentials";
import { CreateIssuerDto } from '../modules/issuer/dto';
import { IssuerDto } from '../modules/issuer/dto';
import { Issuer } from '../modules/issuer/interfaces/issuer.interface';
import { IssueCredentialDto } from '../modules/credential/dto';
import { SendMessageResponse } from 'src/models/User';
import { BLOCK_CHAIN, DURATION_TTL } from '../constants/constant.config';

const {
  VERIDA_APP_NAME,
  VERIDA_TESTNET_DEFAULT_SERVER,
} = process.env;


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
    credentialItem: IssueCredentialDto,
  ): Promise<any> {
    const context = await VeridaHelper.connect(issuer.privateKey);

    const credentials = new Credentials();
    const credentialData = await credentials.createCredentialJWT({
      context: context as any,
      data: credentialItem.data,
      subjectId: credentialItem.did
    });

    const data = await VeridaHelper.sendMessage(credentialData, context, credentialItem.did);

    return data;
  }

  static async sendMessage(
    data: any,
    context: any,
    did: string,
  ): Promise<SendMessageResponse> {
    const type = 'inbox/type/dataSend';

    const config = {
      recipientContextName: 'Verida: Vault',
      did
    };

    const title = data['title'];
    const messaging = await context.getMessaging();

    const messageData = {
      data: [
        data
      ],
    };

    const response = await messaging.send(did, type, messageData, title, config);

    return response as SendMessageResponse;
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


    const context = await Network.connect({
      client: {
        environment: EnvironmentType.TESTNET,
      },
      //@ts-ignore
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
          environment: EnvironmentType.TESTNET,
        },
      ),
      context: {
        name: VERIDA_APP_NAME,
      },
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

      const schemas = await context.getClient().getSchema(schemaTitle);
      const json = await schemas.getSchemaJson();

      return json;
    } catch (error) {
      console.log({ error });
    }
  }
}
