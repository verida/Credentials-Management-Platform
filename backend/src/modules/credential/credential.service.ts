import { IssueCredentialDto } from './dto'
import { BaseHelper } from '../../helpers/BaseHelper'
import { CredentialHelper } from '../../helpers/CredentialHelper'
import Verida from '@verida/datastore'
import utils from '@verida/wallet-utils'

import { Issuer } from '../issuer/interfaces/issuer.interface';

const twilio = require('twilio')

Verida.setConfig({
    environment: process.env.VERIDA_ENVIRONMENT
})

export class CredentialService {

    async issue(issuer: Issuer, cred: IssueCredentialDto): Promise<object> {
        const {
            CREDENTIAL_DOWNLOAD_URL,
            TWILIO_SID,
            TWILIO_TOKEN
        } = process.env;

        // @todo: validate the credential (cred.data)
        // validate schema

        // @todo: Use current user's issuer DID
        const did = 'did:ethr:0xa8a065143Bb45eA5b5be8F0C176A8c10D58360B8'

        // dob = (YYYYMMDD)
        const dob = cred.data['dob']
        const mobile = cred.data['mobile']

        // Generate an encryption key for the credential that combines a
        // partial random key with the user's date of birth
        
        // 6 digit alpha string + credential DOB
        const randomKey = Verida.Helpers.encryption.randomKey(24)
        const randomKeyHex = Buffer.from(randomKey).toString('hex')
        const dobHex = Buffer.from(dob).toString('hex')
        const encryptionKey = new Uint8Array(Buffer.from(randomKeyHex + dobHex, 'hex'))

        // Issue an encrypted credential
        const result = await CredentialService._issueVeridaCredential(issuer, cred, encryptionKey)
        const credentialId = result['result'].id
        const vid = result['vid']

        // Generate a URL that combines the issuer VID, credentialId and partial encryption key
        // BASE64 encode values to save space
        const uniqueId = BaseHelper.convertBase(credentialId.replace(/\-/g,""), 16, 64)
        const keyShortened = BaseHelper.convertBase(randomKeyHex, 16, 64)
        const fetchUrl = CREDENTIAL_DOWNLOAD_URL + "?vid=" + vid + "&c=" + uniqueId + "&k=" + keyShortened

        // @todo SMS crednetial to the recipient 
        //this._sendSmsCredential(fetchUrl, mobile, TWILIO_SID, TWILIO_TOKEN)

        return {
            url: fetchUrl
        }
    }

    static async _issueVeridaCredential(issuer: Issuer, cred: IssueCredentialDto, encryptionKey: Uint8Array): Promise<object> {
        // @todo: Locate issuer based on current logged in user
        const app = await CredentialService._getVerida(issuer)

        /*const seed = '0x22d060c258d129b98f0ac72de5ba1343'
        const did = 'did:ethr:0xa8a065143Bb45eA5b5be8F0C176A8c10D58360B8'
        const chain = 'ethr'
        const node = utils.HDNode.fromSeed(seed)
        const privateKeyHex = node.privateKey
        const address = '0xa8a065143Bb45eA5b5be8F0C176A8c10D58360B8'

        // initialise verida server user using issuer seed key
        const app = new Verida({
            chain: chain,
            address: address,
            privateKey: privateKeyHex
        })

        await app.connect(true)*/

        // @todo: issue a new public, encrypted verida credential
        const now = new Date()
        const credIssuer = await Verida.Helpers.credentials.createIssuer(app.user)
        const credential = {
            "@context": [
                "https://www.w3.org/2018/credentials/v1",
                "https://www.w3.org/2018/credentials/examples/v1"
            ],
            "id": "",
            "type": ["VerifiableCredential"],
            "issuer": issuer.did,
            "issuanceDate": now.toISOString(),
            "credentialSubject": {
                ...cred.data
            },
            "credentialSchema": {
                "id": cred.data['schema'],
                "type": "JsonSchemaValidator2018"
            },
        }

        const didJwtVc = await Verida.Helpers.credentials.createVerifiableCredential(credential, credIssuer)

        const item = {
            didJwtVc: didJwtVc,
            ...cred.data
        }

        const result = await CredentialHelper.issuePublicCredential(app, item, {
            key: encryptionKey
        })

        return result
    }

    async _sendSmsCredential(fetchUrl, mobile, TWILIO_SID, TWILIO_TOKEN) {
        // Send SMS to user with a link to the retrievable credential
        const twilioClient = twilio(TWILIO_SID, TWILIO_TOKEN, { 
            lazyLoading: true 
        });

        const message = await twilioClient.messages
            .create({body: 'Please download your credential: ' + fetchUrl, from: '+15005550006', to: mobile})
        
        console.log(message);
    }

    async findAll(issuer: Issuer, filter: object, options: object) {
        return []
    }

    static async _getVerida(issuer: Issuer) {
        /*const seed = '0x22d060c258d129b98f0ac72de5ba1343'
        const did = 'did:ethr:0xa8a065143Bb45eA5b5be8F0C176A8c10D58360B8'
        const chain = 'ethr'
        const node = utils.HDNode.fromSeed(seed)
        const privateKeyHex = node.privateKey
        const address = '0xa8a065143Bb45eA5b5be8F0C176A8c10D58360B8'*/

        // initialise verida server user using issuer
        const app = new Verida({
            chain: issuer.chain,
            address: issuer.address,
            privateKey: issuer.privateKey
        })

        await app.connect(true)
        return app
    }
}
