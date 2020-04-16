import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

import { CreateUserDto } from './dto';
import { User } from './interfaces/user.interface';

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
