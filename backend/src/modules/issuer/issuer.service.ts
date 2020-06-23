import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Issuer } from './interfaces/issuer.interface';
import { CreateIssuerDto } from './dto';
import * as ethers from "ethers";

//export const generateHdNode = () => ethers.utils.HDNode.fromSeed(ethers.utils.randomBytes(16));

@Injectable()
export class IssuerService {
    constructor(@InjectModel('Issuer') private issuerModel: Model<Issuer>) {}

    async create(createIssuerDto: CreateIssuerDto): Promise<Issuer> {
        // Create issuer blockchain seed when new issuer created
        createIssuerDto.seed = '0x' + Buffer.from(ethers.utils.randomBytes(16)).toString('hex');

        const record = new this.issuerModel(createIssuerDto);
        return record.save();
    }

    async findAll(): Promise<Issuer[]> {
        return this.issuerModel.find().exec();
    }
}
