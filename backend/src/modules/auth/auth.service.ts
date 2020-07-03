import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOne(email);
        return user && bcrypt.compareSync(password, user.passwordHash);
    }

    async login(user: any) {
        const payload = {
            username: user.username,
            sub: user.userId
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
