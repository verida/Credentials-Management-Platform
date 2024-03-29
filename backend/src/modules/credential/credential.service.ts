import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IssueCredentialDto } from './dto';
import { Credential } from './interfaces/credential.interface';
import { Issuer } from '../issuer/interfaces/issuer.interface';

import VeridaHelper from '../../helpers/VeridaHelper';

export class CredentialService {
  constructor(
    @InjectModel('Credential')
    private readonly credentialModel: Model<Credential>,
  ) { }

  async issue(issuer: Issuer, cred: IssueCredentialDto): Promise<object> {
    const issuedCred = await VeridaHelper.issueCredential(issuer, cred);

    if (issuedCred.error) {
      return issuedCred
    }

    // Save the credential to the local database
    const record = new this.credentialModel();
    record.name = cred.name;
    record.did = cred.did;
    record.issuerId = issuer._id;
    record.credentialId = issuedCred.messageId;
    record.revoked = false;
    record.data = issuedCred.generatedCredential;
    delete record.data['didResolutionResult']
    await record.save();

    return record
  }

  async findAll(issuer: Issuer): Promise<Credential[]> {
    return this.credentialModel
      .find({
        issuerId: issuer._id,
      })
      .sort({ insertedAt: 1 })
      .exec();
  }
}
