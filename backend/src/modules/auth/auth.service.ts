import {Body, Headers, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AdminService } from '../admin/admin.service';
import { UserService } from '../user/user.service';

import { AdminIdentity, Identity, UserIdentity } from '../../models/User';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private adminService: AdminService,
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async find (admin: boolean, email): Promise<UserIdentity|AdminIdentity> {
        const service = (admin && this.adminService) || this.userService;
        let user = await service.findOne(email) as (UserIdentity|AdminIdentity);
        if (user) {
            const data = user.toObject ? user.toObject() : user;
            data['isAdmin'] = Boolean(admin);
            user = data;
        }

        return user;
    }

    async validateUser(@Body() identity: Identity) {
        const user = await this.find(identity.isAdmin, identity.email);
        return user && bcrypt.compareSync(identity.password, user.passwordHash);
    }

    async userByToken(@Headers() headers): Promise<UserIdentity|AdminIdentity> {
        const token = headers.authorization.replace('Bearer ', '');
        const data = await this.jwtService.verifyAsync(token);
        return this.find(data.isAdmin, data.email);
    }

    async login(@Body() identity) {
        const { __v, passwordHash, ...user } = await this.find(identity.isAdmin, identity.email);
        return {
            user,
            access_token: this.jwtService.sign({
                email: user.email,
                sub: user._id,
                isAdmin: identity.isAdmin
            }),
        };
    }

    async restore(@Headers() headers) {
        const { __v, passwordHash, ...user } = await this.userByToken(headers);
        return { ...user }
    }
}
