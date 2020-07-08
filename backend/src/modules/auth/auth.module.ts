import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UserService } from "../user/user.service";
import { SuperAdminService } from "../super-admin/super-admin.service";
import { AuthController } from "./auth.controller";

import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";

import { UserSchema } from "../../schemas/user.schema";
import { SuperAdminSchema } from "../../schemas/super-admin.schema";

import { JWT_SECRET } from "../../configs";

@Module({
  providers: [
    JwtStrategy,
    LocalStrategy,
    AuthService,
    UserService,
    SuperAdminService
  ],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'SuperAdmin', schema: SuperAdminSchema }
    ]),
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    })
  ]
})
export class AuthModule {}
