import { IssueCredentialDto } from './dto'
import { BaseHelper } from '../../helpers/BaseHelper'
import { CredentialHelper } from '../../helpers/CredentialHelper'
import Verida from '@verida/datastore'

const twilio = require('twilio')

Verida.setConfig({
    environment: process.env.VERIDA_ENVIRONMENT
})

export class CredentialService {

    async issue(cred: IssueCredentialDto): Promise<object> {
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
        const result = await CredentialService._issueVeridaCredential(cred, encryptionKey)
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

    static async _issueVeridaCredential(cred: IssueCredentialDto, encryptionKey: Uint8Array): Promise<object> {
        const issuer = await CredentialService._getIssuer()
        const did = issuer['did']

        // initialise verida server user using issuer seed key
        const app = new Verida({
            chain: issuer['chain'],
            address: issuer['address'],
            privateKey: issuer['privateKey']
        })

        await app.connect(true)

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
            "issuer": did,
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

    /**
     * @todo: Replace this with getting the issuer of the current logged in user
     */
    static async _getIssuer(): Promise<object> {
        return {
            "name": "KH - Test",
            "privateKey": "0x57de8c069ba247ae23b6ceb752e24a64a971fa53957f2a2e9e7d068821ed2477",
            "chain": "vechain",
            "address": "0xa9cf50dc2c6ad08bb97c769d96055f1cfab29f80",
            "did": "did:vechain:0xa9cf50dc2c6ad08bb97c769d96055f1cfab29f80"
          }
    }

    async _sendSmsCredential(fetchUrl: string, mobile: string, TWILIO_SID: string, TWILIO_TOKEN: string) {
        // Send SMS to user with a link to the retrievable credential
        const twilioClient = twilio(TWILIO_SID, TWILIO_TOKEN, { 
            lazyLoading: true 
        });

        const message = await twilioClient.messages
            .create({body: 'Please download your credential: ' + fetchUrl, from: '+15005550006', to: mobile})
        
        console.log(message);
    }
}
