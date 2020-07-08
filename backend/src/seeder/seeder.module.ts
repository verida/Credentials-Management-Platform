import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminService } from '../modules/admin/admin.service';
import { SeederService } from './seeder.service';
import { AdminModule } from '../modules/admin/admin.module';
import { AdminSchema } from '../schemas/admin.schema';

import { DB_URL } from "../configs";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(DB_URL),
        MongooseModule.forFeature([
            { name: 'Admin', schema: AdminSchema }
        ]),
        AdminModule
    ],
    providers: [
        Logger,
        SeederService,
        AdminService
    ],
})
export class SeederModule {}
