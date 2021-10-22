import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { IssuerService } from './issuer.service';

import { CreateIssuerDto } from './dto';
import { IssuerResponse } from './interfaces/issuer.response.interface';
import { AuthGuard } from '@nestjs/passport';
import { SchemaService } from '../schema/schemas.service';

@Controller('issuer')
export class IssuerController {
  constructor(
    private issuerService: IssuerService,
    private schemaService: SchemaService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() data: CreateIssuerDto): Promise<IssuerResponse> {
    const { issuerRecord, issuerResponse } = await this.issuerService.create(
      data,
    );

    await this.schemaService.saveDefaultSchema(issuerRecord);

    return issuerResponse;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<IssuerResponse[]> {
    return this.issuerService.findAll();
  }

  @Get('lookup')
  async lookup(@Query('urlName') urlName: string): Promise<any> {
    const issuer = await this.issuerService.findOneByUrlName(urlName);
    return {
      name: issuer.name,
    };
  }
}
