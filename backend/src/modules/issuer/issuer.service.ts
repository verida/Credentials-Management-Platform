import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Issuer } from './interfaces/issuer.interface';
import { IssuerResponse } from './interfaces/issuer.response.interface';
import { CreateIssuerDto } from './dto';

import VeridaHelper from '../../helpers/VeridaHelper';

@Injectable()
export class IssuerService {
  constructor(
    @InjectModel('IssuerResponse')
    private issuerResponse: Model<IssuerResponse>,
    @InjectModel('Issuer') private issuerModel: Model<Issuer>,
  ) {}

  async create(
    createIssuerDto: CreateIssuerDto,
  ): Promise<{ issuerResponse: IssuerResponse; issuerRecord: Issuer }> {
    // Create a new blockchain account for the issuer
    const issuer = await VeridaHelper.createIssuer(createIssuerDto);

    await VeridaHelper.setIssuerName(issuer);

    const issuerRecord = new this.issuerModel(issuer);
    const issuerModel = await issuerRecord.save();

    // Set the public profile name of the issuer to match that of the account
    // (Do this after saving issuer to local database to ensure unique names)
    // Create an issuer respnse that hides the privateKey

    const issuerResponse = new this.issuerResponse(issuerModel);

    return { issuerResponse, issuerRecord };
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
