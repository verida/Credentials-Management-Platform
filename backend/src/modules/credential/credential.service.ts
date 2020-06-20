import { IssueCredentialDto } from './dto';

export class CredentialService {

    async issue(cred: IssueCredentialDto): Promise<string> {
        return "done";
    }
}
