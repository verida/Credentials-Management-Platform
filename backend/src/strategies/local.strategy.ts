import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: "email", passReqToCallback: true });
    }

    async validate(@Req() request): Promise<any> {
        const user = await this.authService.validateUser(request.body);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
