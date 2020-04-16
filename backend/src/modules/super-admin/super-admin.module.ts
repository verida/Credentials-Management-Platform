import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdminController } from './super-admin.controller';
import { SuperAdminService } from './super-admin.service';
import { SuperAdminSchema } from '../../schemas/super-admin.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'SuperAdmin', schema: SuperAdminSchema }])],
    controllers: [SuperAdminController],
    providers: [SuperAdminService],
})
export class SuperAdminModule {}
