import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModule } from "../user/user.module";
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  imports: [
    UserModule,
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
