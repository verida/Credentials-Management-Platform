import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Issuer } from './interfaces/issuer.interface';
import { IssuerResponse } from './interfaces/issuer.response.interface';
import { CreateIssuerDto } from './dto';
import { IssuerDto } from './dto';
import utils from '@verida/wallet-utils'

@Injectable()
export class IssuerService {
    constructor(@InjectModel('IssuerResponse') private issuerResponse: Model<IssuerResponse>, @InjectModel('Issuer') private issuerModel: Model<Issuer>) {}

    async create(createIssuerDto: CreateIssuerDto): Promise<IssuerResponse> {
        const account = utils.createAccount(createIssuerDto.chain)

        const issuer = new IssuerDto()
        issuer.name = createIssuerDto.name
        issuer.chain = account['chain']
        issuer.did = account['did']
        issuer.privateKey = account['privateKey']
        issuer.publicKey = account['publicKey']
        issuer.address = account['address']

        const record = new this.issuerModel(issuer);
        const issuerModel = await record.save()
        const issuerResponse = new this.issuerResponse(issuerModel)
        return issuerResponse
    }

    async findAll(): Promise<IssuerResponse[]> {
        return this.issuerResponse.find().exec();
    }

    async findOne(id: string): Promise<Issuer | undefined> {
        return this.issuerModel.findOne({ _id: id })
    }
}
