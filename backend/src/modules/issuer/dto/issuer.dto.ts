import * as mongoose from 'mongoose';

export class IssuerDto {
    _id: mongoose.Schema.Types.ObjectId;
    nameemail: string;
}
