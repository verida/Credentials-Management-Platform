import {Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { IssuerService } from './issuer.service';

import { CreateIssuerDto } from './dto';
import { IssuerResponse } from './interfaces/issuer.response.interface';
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
@Controller('issuer')
export class IssuerController {
    constructor(private issuerService: IssuerService) {}

    @Post()
    async create(@Body() data: CreateIssuerDto): Promise<IssuerResponse> {
        return this.issuerService.create(data)
    }

    @Get()
    findAll(): Promise<IssuerResponse[]> {
        return this.issuerService.findAll();
    }
}
