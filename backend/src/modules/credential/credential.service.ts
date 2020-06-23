import { IssueCredentialDto } from './dto';

export class CredentialService {

    async issue(cred: IssueCredentialDto): Promise<string> {
        // @todo: Locate issuer based on current logged in user

        //const credentialId = this._issueVerifiedCredential(cred);
        
        // @todo Send SMS to user

        return "done";
    }

    async _issueVeridaCredential(cred: IssueCredentialDto) {
        /*Verida.setConfig({
            environment: "local"
        });
        
        const verida = new Verida()
        Verida.Helpers.credential....
        */
    }
}
