import {Controller, Get, Post, Body, Res, Req, UseGuards} from '@nestjs/common';
import { AdminService } from './admin.service';

import { CreateAdminDto } from './dto';
import { Admin } from './interfaces/admin.interface';
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../auth/auth.service";

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService, private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() request) {
        return this.authService.login(request)
    }

    @Post('create')
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
