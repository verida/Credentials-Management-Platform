import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './modules/user/user.module';
import { SuperAdminModule } from './modules/super-admin/super-admin.module';
import { CredentialModule } from './modules/credential/credential.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    UserModule,
    SuperAdminModule,
    CredentialModule
  ],
})
export class AppModule {}
