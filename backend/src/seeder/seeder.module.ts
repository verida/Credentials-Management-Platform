import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { SuperAdminService } from '../modules/super-admin/super-admin.service';
import { SeederService } from './seeder.service';
import { SuperAdminModule } from '../modules/super-admin/super-admin.module';
import { SuperAdminSchema } from '../schemas/super-admin.schema';

import { DB_URL } from "../configs";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(DB_URL),
        MongooseModule.forFeature([
            { name: 'SuperAdmin', schema: SuperAdminSchema }
        ]),
        SuperAdminModule
    ],
    providers: [
        Logger,
        SeederService,
        SuperAdminService
    ],
})
export class SeederModule {}
