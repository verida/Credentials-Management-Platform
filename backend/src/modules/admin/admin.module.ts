import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminSchema } from '../../schemas/admin.schema';
import { UserSchema } from '../../schemas/user.schema';
import {AuthService} from "../auth/auth.service";
import {UserService} from "../user/user.service";
import {JwtModule} from "@nestjs/jwt";
import {JWT_SECRET} from "../../configs";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Admin', schema: AdminSchema },
            { name: 'User', schema: UserSchema }
        ]),
        JwtModule.register({
            secret: JWT_SECRET,
            signOptions: { expiresIn: '3600s' },
        })
    ],
    controllers: [AdminController],
    providers: [AdminService, AuthService, UserService],
})
export class AdminModule {}
