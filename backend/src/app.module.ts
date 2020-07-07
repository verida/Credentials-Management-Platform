import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './modules/user/user.module';
import { SuperAdminModule } from './modules/super-admin/super-admin.module';
import { CredentialModule } from './modules/credential/credential.module';
import { IssuerModule } from './modules/issuer/issuer.module';
import { AuthModule } from './modules/auth/auth.module';

import { DB_URL } from "./configs";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }),
    UserModule,
    SuperAdminModule,
    CredentialModule,
    IssuerModule,
    AuthModule
  ],
})
export class AppModule {}
