import { Controller, Get, Post, Body } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';

import { CreateSuperAdminDto } from './dto';
import { SuperAdmin } from './interfaces/super-admin.interface';

@Controller('super-admin')
export class SuperAdminController {
    constructor(private superAdminService: SuperAdminService) {}

    @Post()
    async create(@Body() data: CreateSuperAdminDto): Promise<SuperAdmin> {
        return this.superAdminService.create(data)
    }

    @Get()
    findAll(): Promise<SuperAdmin[]> {
        return this.superAdminService.findAll();
    }
}
