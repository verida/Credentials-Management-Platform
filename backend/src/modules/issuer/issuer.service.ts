import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Issuer } from './interfaces/issuer.interface';
import { IssuerResponse } from './interfaces/issuer.response.interface';
import { CreateIssuerDto, UpdateIssuerDto } from './dto';
import { SchemaService } from '../schema/schemas.service';

import VeridaHelper from '../../helpers/VeridaHelper';

@Injectable()
export class IssuerService {
  constructor(
    @InjectModel('IssuerResponse')
    private issuerResponse: Model<IssuerResponse>,
    @InjectModel('Issuer') private issuerModel: Model<Issuer>,
    private schemaService: SchemaService,
  ) {}

  async create(createIssuerDto: CreateIssuerDto): Promise<IssuerResponse> {
    const issuer = new this.issuerModel(createIssuerDto);

    const {
      address,
      chain,
      did,
      privateKey,
      publicKey,
    } = await VeridaHelper.createAccount(issuer.name, issuer.avatarUri);
    issuer.chain = chain;
    issuer.did = did;
    issuer.privateKey = privateKey;
    issuer.publicKey = publicKey;
    issuer.address = address;

    await issuer.save();
    await this.schemaService.saveDefaultSchema(issuer);

    return new this.issuerResponse(issuer);
  }

  async findAll(): Promise<IssuerResponse[]> {
    return this.issuerResponse.find().exec();
  }

  async findOne(id: string): Promise<Issuer | undefined> {
    return this.issuerModel.findOne({ _id: id });
  }

  async findOneByUrlName(urlName: string): Promise<Issuer | undefined> {
    return this.issuerModel.findOne({ urlName: urlName });
  }
}
