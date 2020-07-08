import {Controller, Post, UseGuards, Body, Req, Get, Res, HttpStatus} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() body) {
        return this.authService.login(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('restore')
    async restore(@Req() request) {
        return this.authService.restore(request.headers);
    }
}
