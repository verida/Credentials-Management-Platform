import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './modules/user/user.module';
import { SuperAdminModule } from './modules/super-admin/super-admin.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    UserModule,
    SuperAdminModule
  ],
})
export class AppModule {}
