import {Body, Headers, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AdminService } from "../admin/admin.service";
import { UserService } from "../user/user.service";

import * as bcrypt from 'bcrypt';
import { Identity } from "../../models/User";

import { User } from "../user/interfaces/user.interface";
import { Admin } from "../admin/interfaces/admin.interface";

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

    async userByToken(@Headers() headers) {
        const token = headers.authorization.replace('Bearer ', '');
        const data = await this.jwtService.verifyAsync(token);
        return this.find(data.isAdmin, data.email) as Promise<User>;
    }

    async login(@Body() identity) {
        const user = await this.find(identity.isAdmin, identity.email);
        let response = {
            user: { email: user.email, id: user._id },
            access_token: this.jwtService.sign({
                email: user.email,
                sub: user._id,
                isAdmin: identity.isAdmin
            }),
        };

        if (!identity.isAdmin) {
            response.user['issuerId'] = user['issuerId']
        }

        return response
    }

    async restore(@Headers() headers) {
        const user = await this.userByToken(headers);
        return {
            email: user.email,
            id: user._id
        }
    }
}
