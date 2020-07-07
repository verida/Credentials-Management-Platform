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

    async login(email: string, password: string) {
        const payload = { email, sub: password };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
