import {Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';

import { CreateUserDto } from './dto';
import { User } from './interfaces/user.interface';
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async create(@Body() data: CreateUserDto): Promise<User> {
        return this.userService.create(data)
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}
