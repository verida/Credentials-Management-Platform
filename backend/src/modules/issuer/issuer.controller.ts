import { Controller, Get, Post, Body } from '@nestjs/common';
import { IssuerService } from './issuer.service';

import { CreateIssuerDto } from './dto';
import { Issuer } from './interfaces/issuer.interface';

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
