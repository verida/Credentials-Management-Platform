import NodeCache from 'node-cache';
import { Wallet } from 'ethers';
import { Context, Network } from '@verida/client-ts';
import { AutoAccount } from '@verida/account-node';
import { Credentials } from '@verida/verifiable-credentials';
import EncryptionUtils from '@verida/encryption-utils'
import { IssuerDto } from '../modules/issuer/dto';
import { Issuer } from '../modules/issuer/interfaces/issuer.interface';
import { IssueCredentialDto } from '../modules/credential/dto';
import { SendMessageResponse } from 'src/models/User';
import { BLOCK_CHAIN, DURATION_TTL } from '../constants';
import { config } from 'src/config';

const appConfig = config()

const CacheManager = new NodeCache();

const VERIDA_DEFAULT_DID_SERVERS = appConfig.veridaDefaultDidServers;
const VERIDA_DEFAULT_STORAGE_NODES = appConfig.veridaDefaultStorageNodes;

const VERIDA_CREDENTIAL_SCHEMA = 'https://common.schemas.verida.io/credential/base/v0.2.0/schema.json'

export default class VeridaHelper {
/**
 * method to create a new issuer account 
 * @param name 
 * @param avatarUri 
 * @returns 
 */
  static async createAccount(
    name: string,
    avatarUri?: string,
  ): Promise<{
    chain: string;
    did: string;
    privateKey: string;
    publicKey: string;
    address: string;
  }> {
    const account = await VeridaHelper.generateAccount();

    const context = await VeridaHelper.connect(account.privateKey);

    const did = await context.getAccount().did();

    this.setProfile(context, name, avatarUri);
    
    return {
      chain: BLOCK_CHAIN,
      did: did,
      privateKey: account.privateKey,
      publicKey: account.publicKey,
      address: account.address,
    };
  }

  static async updateAccount(
    privateKey: string,
    name: string,
    avatarUri?: string,
  ) {
    const context = await VeridaHelper.connect(privateKey);
    this.setProfile(context, name, avatarUri);
  }

  static async setProfile(context, name: string, avatarUri?: string) {
    const profile = await context.openProfile('basicProfile');
    await profile.set('name', name);
    if (avatarUri) {
      await profile.set('avatar', {
        uri: avatarUri,
      });
    }
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
    const credentials = new Credentials();
    try {
      const context = await VeridaHelper.connect(issuer.privateKey);

      let payload: any = {}
      if (credentialItem.proofs) {
        payload.proofs = {}
        
        for (let key in credentialItem.proofs) {
          const proofItem = credentialItem.proofs[key]
          const proofString = proofItem.join('-')
          const sig = EncryptionUtils.signData(proofString, new Uint8Array(Buffer.from(issuer.privateKey.slice(2), 'hex')))
          payload.proofs[key] = sig
        }
      }

      const didJwtVc = await credentials.createCredentialJWT({
        context: context as any,
        data: credentialItem.data,
        subjectId: credentialItem.did,
        schema: credentialItem.schema,
        payload
      });

      // @ts-ignore
      const generatedCredential = await credentials.verifyCredential(didJwtVc, {})

      // Credential record that could be saved into a database (or sent to a user)
      const credentialRecord = {
        schema: VERIDA_CREDENTIAL_SCHEMA,
        name: credentialItem.name,
        summary: credentialItem.summary,
        didJwtVc
      }

      const messageData = await VeridaHelper.sendMessage(
        credentialItem.title,
        credentialRecord,
        context,
        credentialItem.did,
      );

      await context.close()

      return {
        generatedCredential,
        messageId: messageData.id
      };
    } catch (error) {
      if (credentials.getErrors()) {
        console.log(credentials.getErrors())
        return {
          error: credentials.getErrors()
        }
      }
      console.log({ error });
      return {
        error: error.message
      }
    }
  }

  static async sendMessage(
    subject: string,
    credentialRecord: any,
    context: any,
    did: string,
  ): Promise<SendMessageResponse> {
    const type = 'inbox/type/dataSend';
    try {
    const config = {
      recipientContextName: 'Verida: Vault',
      did,
    };

    const messaging = await context.getMessaging();

    const messageData = {
      data: [credentialRecord],
    };

    const response = await messaging.send(
      did,
      type,
      messageData,
      subject,
      config,
    );

    return response as SendMessageResponse;
    } catch (error) {
      console.log({error});
    }
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

    const defaultEndpoints = {
      defaultDatabaseServer: {
        type: 'VeridaDatabase',
        endpointUri: VERIDA_DEFAULT_STORAGE_NODES,
      },
      defaultMessageServer: {
        type: 'VeridaMessage',
        endpointUri: VERIDA_DEFAULT_STORAGE_NODES,
      },
    };

    const account = new AutoAccount(defaultEndpoints, {
      privateKey: issuerPrivateKey,
      environment: appConfig.veridaEnvironment,
      didClientConfig: {
        callType: 'web3',
        web3Config: {
          privateKey: appConfig.polygonPrivateKey,
          rpcUrl: appConfig.rpcUrl
        },
        didEndpoints: VERIDA_DEFAULT_DID_SERVERS,
      }
    })
    
    const context = await Network.connect({
      client: {
        environment: appConfig.veridaEnvironment
      },
      account,
      context: {
        name: appConfig.veridaAppName,
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
      throw new Error(error);
    }
  }
}
