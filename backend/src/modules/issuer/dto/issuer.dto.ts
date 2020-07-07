import * as mongoose from 'mongoose';

export class IssuerDto {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    seed: string;
    did: string;
    chain: string;
    address: string;
}
