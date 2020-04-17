import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { SuperAdminService } from '../modules/super-admin/super-admin.service';
import { Seeder } from "./seeder";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_URL)
    ],
    providers: [SuperAdminService, Logger, Seeder],
})
export class SeederModule {}
