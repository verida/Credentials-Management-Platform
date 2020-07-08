import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SuperAdminService } from "../super-admin/super-admin.service";

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private superAdminService: SuperAdminService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.superAdminService.findOne(email);
        return user && bcrypt.compareSync(password, user.passwordHash);
    }

    async login(email: string) {
        const user = await this.superAdminService.findOne(email);
        return {
            data: { email, id: user._id },
            access_token: this.jwtService.sign({ email, sub: user._id }),
        };
    }
}
