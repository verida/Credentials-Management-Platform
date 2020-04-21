import { Injectable } from '@nestjs/common';
import { SuperAdminService } from '../super-admin/super-admin.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private superAdminService: SuperAdminService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.superAdminService.findOne(email);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(email: string, password: string) {
        const payload = { email, id: 'id' };
        return { access_token: this.jwtService.sign(payload) };
    }
}
