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

        const user = await this.superAdminService.findOne(email);
        if (!user) {
            response.send({
                error: "Invalid email or password"
            });
        }

        const passwordHash = bcrypt.hashSync(password, process.env.SALT);
        if (passwordHash !== user.password) {
            return response.send({ error: "Invalid email or password" });
        }

        return response.send({data : user });
    }
}
