import * as mongoose from 'mongoose';

export class IssueCredentialDto {
    _id: mongoose.Schema.Types.ObjectId;
    data: object;
}
