import { IssueCredentialDto } from './dto'
import { BaseHelper } from '../../helpers/BaseHelper'
import { CredentialHelper } from '../../helpers/CredentialHelper'
import Verida from '@verida/datastore'
import { utils } from "ethers"

const twilio = require('twilio')

export class CredentialService {

    async issue(cred: IssueCredentialDto): Promise<object> {
        const {
            CREDENTIAL_DOWNLOAD_URL,
            TWILIO_SID,
            TWILIO_TOKEN
        } = process.env;

        const did = 'did:ethr:0xa8a065143Bb45eA5b5be8F0C176A8c10D58360B8'

        // dob = (yyyymmdd)
        const dob = cred.data['dob']

        // Generate a password for the credential that combines a
        
        // 6 digit alpha string + credential DOB
        const randomKey = Verida.Helpers.encryption.randomKey(24)
        const randomKeyHex = Buffer.from(randomKey).toString('hex')
        const dobHex = Buffer.from(dob).toString('hex')

        const encryptionKey = new Uint8Array(Buffer.from(randomKeyHex + dobHex, 'hex'))
        const encryptionKeyHex = Buffer.from(encryptionKey).toString('hex')
        const result = await CredentialService._issueVeridaCredential(cred, encryptionKey)
        const credentialId = result['result'].id
        const vid = result['vid']

        const uniqueId = BaseHelper.convertBase(credentialId.replace(/\-/g,""), 16, 64) // --- = 16 char string
        const keyShortened = BaseHelper.convertBase(randomKeyHex, 16, 64)
        const fetchUrl = CREDENTIAL_DOWNLOAD_URL + "?vid=" + vid + "&c=" + uniqueId + "&k=" + keyShortened

        //this._sendSmsCredential(fetchUrl, TWILIO_SID, TWILIO_TOKEN)

        return {
            url: fetchUrl
        }
    }

    static async _issueVeridaCredential(cred: IssueCredentialDto, encryptionKey: Uint8Array): Promise<object> {
        Verida.setConfig({
            //environment: "local"
        })

        // @todo: Locate issuer based on current logged in user

        const seed = '0x22d060c258d129b98f0ac72de5ba1343'
        const did = 'did:ethr:0xa8a065143Bb45eA5b5be8F0C176A8c10D58360B8'
        const node = utils.HDNode.fromSeed(seed)
        const privateKeyHex = node.privateKey
        const address = '0xa8a065143Bb45eA5b5be8F0C176A8c10D58360B8'

        // initialise verida server user using issuer seed key
        const app = new Verida({
            chain: 'ethr',
            address: address,
            privateKey: privateKeyHex
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
            }
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

    async _sendSmsCredential(fetchUrl, TWILIO_SID, TWILIO_TOKEN) {
        // Send SMS to user with a link to the retrievable credential
        const twilioClient = twilio(TWILIO_SID, TWILIO_TOKEN, { 
            lazyLoading: true 
        });

        const message = await twilioClient.messages
            .create({body: 'Please download your credential: ' + fetchUrl, from: '+15005550006', to: '+61421000000'})
        
        console.log(message);
    }
}
