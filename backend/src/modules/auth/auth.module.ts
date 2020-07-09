import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UserService } from "../user/user.service";
import { AdminService } from "../admin/admin.service";
import { AuthController } from "./auth.controller";

import { JwtStrategy } from "../../strategies/jwt.strategy";
import { LocalStrategy } from "../../strategies/local.strategy";

import { UserSchema } from "../../schemas/user.schema";
import { AdminSchema } from "../../schemas/admin.schema";

import { JWT_SECRET } from "../../configs";

@Module({
  providers: [
    JwtStrategy,
    LocalStrategy,
    AuthService,
    UserService,
    AdminService
  ],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Admin', schema: AdminSchema }
    ]),
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    })
  ]
})
export class AuthModule {}
