import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';

import { CreateSuperAdminDto } from './dto';
import { SuperAdmin } from './interfaces/super-admin.interface';

import * as bcrypt from 'bcrypt';

@Controller('super-admin')
export class SuperAdminController {
    constructor(private superAdminService: SuperAdminService) {}

    @Post('register')
    async create(@Body() data: CreateSuperAdminDto): Promise<SuperAdmin> {
        return this.superAdminService.create(data)
    }

    @Get()
    findAll(): Promise<SuperAdmin[]> {
        return this.superAdminService.findAll();
    }

    async findOne(@Body() data: CreateSuperAdminDto, @Res() response): Promise<any> {
        const { email, password } = data;

        return response.send({ data });
    }
}
