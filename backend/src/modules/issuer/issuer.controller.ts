import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import { IssuerService } from './issuer.service';

import { CreateIssuerDto, UpdateIssuerDto } from './dto';
import { IssuerResponse } from './interfaces/issuer.response.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('issuer')
export class IssuerController {
  constructor(private issuerService: IssuerService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() data: CreateIssuerDto): Promise<IssuerResponse> {
    return this.issuerService.create(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateIssuerDto,
  ): Promise<IssuerResponse> {
    return this.issuerService.update(id, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<IssuerResponse[]> {
    return this.issuerService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string): Promise<IssuerResponse> {
    return this.issuerService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('lookup')
  async lookup(@Query('urlName') urlName: string): Promise<any> {
    const issuer = await this.issuerService.findOneByUrlName(urlName);
    return {
      name: issuer.name,
    };
  }
}
