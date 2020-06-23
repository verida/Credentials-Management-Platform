import { IssueCredentialDto } from './dto';
import { BaseHelper } from '../../helpers/BaseHelper';
const twilio = require('twilio');

export class CredentialService {

    async issue(cred: IssueCredentialDto): Promise<string> {
        const {
            CREDENTIAL_DOWNLOAD_URL,
            TWILIO_SID,
            TWILIO_TOKEN
        } = process.env;

        // @todo: Locate issuer based on current logged in user

        // Generate a password for the credential that combines a
        // 6 digit alpha string + credential DOB
        // const key = Verida.Helpers.encryption.randomKey(6);
        const key = Buffer.from("b7370e");
        const keyHex = Buffer.from(key).toString('hex');

        // const dob = Buffer.from(cred.dateOfBirth);
        // const encryptionKey = key + dob; // will this work?

        //const credentialId = this._issueVerifiedCredential(cred, encryptionKey);        
        const credentialId = "1ef1a15220a6125b2f6c5d9b";

        const uniqueId = BaseHelper.convertBase(credentialId, 16, 64) // --- = 16 char string
        const keyShortened = BaseHelper.convertBase(keyHex, 16, 64)
        const fetchUrl = CREDENTIAL_DOWNLOAD_URL + "?id=" + uniqueId + "&k=" + keyShortened;

        console.log(fetchUrl);
        
        // @todo Send SMS to user with a link to the retrievable credential
        const twilioClient = twilio(TWILIO_SID, TWILIO_TOKEN, { 
            lazyLoading: true 
        });

        const message = await twilioClient.messages
            .create({body: 'Please download your credential: ' + fetchUrl, from: '+15005550006', to: '+61421000000'})
        
        console.log(message);

        return "done";
    }

    async _issueVeridaCredential(cred: IssueCredentialDto, encryptionKey: string) {
        /*Verida.setConfig({
            environment: "local"
        });

        // @todo: initialise verida server user using issuer seed key
        
        // initilaise verida
        const verida = new Verida()

        // @todo: issue a new public, encrypted verida credential
        Verida.Helpers.credential....

        // return credentialId
        */
    }
}
