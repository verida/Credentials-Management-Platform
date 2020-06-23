import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Issuer } from './interfaces/issuer.interface';
import { CreateIssuerDto } from './dto';

@Injectable()
export class IssuerService {
    constructor(@InjectModel('Issuer') private issuerModel: Model<Issuer>) {}

    async create(createIssuerDto: CreateIssuerDto): Promise<Issuer> {
        const record = new this.issuerModel(createIssuerDto);
        return record.save();
    }

    async findAll(): Promise<Issuer[]> {
        return this.issuerModel.find().exec();
    }
}
