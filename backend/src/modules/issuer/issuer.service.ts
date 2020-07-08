import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Issuer } from './interfaces/issuer.interface';
import { CreateIssuerDto } from './dto';
import VechainWalletHelper from '../../helpers/VechainWalletHelper';

@Injectable()
export class IssuerService {
    constructor(@InjectModel('Issuer') private issuerModel: Model<Issuer>) {}

    async create(createIssuerDto: CreateIssuerDto): Promise<Issuer> {
        // Create issuer blockchain seed when new issuer created
        const privateKeyBuffer = VechainWalletHelper.createPrivateKey()

        createIssuerDto.privateKey = '0x' + privateKeyBuffer.toString('hex')
        createIssuerDto.chain = 'vechain'
        createIssuerDto.address = '0x' + VechainWalletHelper.getAddress(privateKeyBuffer)
        createIssuerDto.did = 'did:vechain:' + createIssuerDto.address

        const record = new this.issuerModel(createIssuerDto);
        return record.save();
    }

    async findAll(): Promise<Issuer[]> {
        return this.issuerModel.find().exec();
    }
}
