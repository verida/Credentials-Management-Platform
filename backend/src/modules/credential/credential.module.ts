import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CredentialController } from './credential.controller';
import { CredentialService } from './credential.service';

import { UserModule } from '../user/user.module';
import { IssuerModule } from '../issuer/issuer.module';
import { AuthService } from "../auth/auth.service";
import { AdminService } from "../admin/admin.service";
import { JwtModule } from "@nestjs/jwt";

import { CredentialSchema } from '../../schemas/credential.schema';
import { AdminSchema } from "../../schemas/admin.schema";

@Module({
    imports: [
        UserModule,
        IssuerModule,
        MongooseModule.forFeature([
            { name: 'Credential', schema: CredentialSchema },
            { name: 'Admin', schema: AdminSchema }
        ]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '3600s' },
        })
    ],
    controllers: [CredentialController],
    providers: [CredentialService, AuthService, AdminService]
})
export class CredentialModule {}
