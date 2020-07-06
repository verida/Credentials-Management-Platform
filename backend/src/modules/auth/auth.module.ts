import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UserService } from "../user/user.service";

import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
  providers: [AuthService, JwtStrategy, UserService],
  exports: [AuthService],
  imports: [
    PassportModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    })
  ]
})
export class AuthModule {}
