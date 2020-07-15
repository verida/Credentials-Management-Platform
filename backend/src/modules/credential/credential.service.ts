import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IssueCredentialDto } from './dto'
import { Credential } from './interfaces/credential.interface';
import { Issuer } from '../issuer/interfaces/issuer.interface';

import VeridaHelper from '../../helpers/VeridaHelper'
import SmsHelper from '../../helpers/SmsHelper'

export class CredentialService {
    constructor(@InjectModel('Credential') private readonly credentialModel: Model<Credential>) {}

    async issue(issuer: Issuer, cred: IssueCredentialDto): Promise<object> {
        const { url, mobile, credentialId } = await VeridaHelper.issueCredential(issuer, cred)

        // Save the credential to the local database
        const record = new this.credentialModel()
        record.name = cred.data['name']
        record.mobile = cred.mobile
        record.issuerId = issuer._id
        record.credentialId = credentialId
        record.revoked = false
        record.data = cred.data
        await record.save();

        // SMS credential to the recipient
        SmsHelper.sendSmsCredential(url, mobile)

        return record
    }

    async findAll(issuer: Issuer): Promise<Credential[]> {
        return this.credentialModel.find({
            issuerId: issuer._id
        }).exec();
    }

}
