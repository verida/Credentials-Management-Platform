import {Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { IssuerService } from './issuer.service';

import { CreateIssuerDto } from './dto';
import { Issuer } from './interfaces/issuer.interface';
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
@Controller('issuer')
export class IssuerController {
    constructor(private issuerService: IssuerService) {}

    @Post()
    async create(@Body() data: CreateIssuerDto): Promise<Issuer> {
        return this.issuerService.create(data)
    }

    @Get()
    findAll(): Promise<Issuer[]> {
        return this.issuerService.findAll();
    }
}
