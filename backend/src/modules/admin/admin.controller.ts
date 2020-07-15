import {Controller, Get, Post, Body, Res, Req, UseGuards} from '@nestjs/common';
import { AdminService } from './admin.service';

import { CreateAdminDto } from './dto';
import { Admin } from './interfaces/admin.interface';
import { AuthService } from "../auth/auth.service";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService, private authService: AuthService) {}

    @Post()
    async create(@Body() data: CreateAdminDto): Promise<Admin> {
        return this.adminService.create(data)
    }

    @Get()
    findAll(): Promise<Admin[]> {
        return this.adminService.findAll();
    }

    async findOne(@Body() data: CreateAdminDto, @Res() response): Promise<any> {
        const { email, password } = data;

        return response.send({ data });
    }
}
