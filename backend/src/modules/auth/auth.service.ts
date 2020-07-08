import {Body, Headers, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AdminService } from "../admin/admin.service";
import { UserService } from "../user/user.service";

import * as bcrypt from 'bcrypt';
import { Identity } from "../../models/User";

@Injectable()
export class AuthService {
    constructor(
        private adminService: AdminService,
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async find (admin: boolean, email) {
        const service = (admin && this.adminService) || this.userService;
        return service.findOne(email);
    }

    async validateUser(@Body() identity: Identity): Promise<any> {
        const user = await this.find(identity.isAdmin, identity.email);
        return user && bcrypt.compareSync(identity.password, user.passwordHash);
    }

    async login(@Body() identity) {
        const user = await this.find(identity.isAdmin, identity.email);
        return {
            user: { email: user.email, id: user._id },
            access_token: this.jwtService.sign({
                email: user.email,
                sub: user._id,
                isAdmin: identity.isAdmin
            }),
        };
    }

    async restore(@Headers() headers) {
        const token = headers.authorization.replace('Bearer ', '');
        const data = await this.jwtService.verifyAsync(token);
        const user = await this.find(data.isAdmin, data.email);
        return {
            email: user.email,
            id: user._id
        }
    }
}
