import { Module } from '@nestjs/common';
import { VeridaSchema } from 'src/schemas/verida.schema';
import { SchemaController } from './schema.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaService } from './schemas.service';
import { AuthService } from '../auth/auth.service';
import { AdminService } from '../admin/admin.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AdminModule } from '../admin/admin.module';
import { AdminSchema } from 'src/schemas/admin.schema';
import { UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    AdminModule,
    MongooseModule.forFeature([{ name: 'veridaSchema', schema: VeridaSchema }]),
    MongooseModule.forFeature([
      { name: 'Admin', schema: AdminSchema },
      { name: 'User', schema: UserSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [SchemaController],
  providers: [SchemaService, AuthService, AdminService, UserService],
  exports: [SchemaService, AuthService, AdminService, UserService],
})
export class SchemaModule {}
