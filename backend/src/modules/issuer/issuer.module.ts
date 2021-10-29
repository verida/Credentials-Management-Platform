import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IssuerController } from './issuer.controller';
import { IssuerService } from './issuer.service';
import { IssuerSchema } from '../../schemas/issuer.schema';
import { IssuerResponseSchema } from '../../schemas/issuer.response.schema';
import { SchemaService } from '../schema/schemas.service';
import { SchemaModule } from '../schema/schema.module';
import { VeridaSchema } from 'src/schemas/verida.schema';

@Module({
  imports: [
    SchemaModule,
    MongooseModule.forFeature([{ name: 'Issuer', schema: IssuerSchema }]),
    MongooseModule.forFeature([
      { name: 'IssuerResponse', schema: IssuerResponseSchema },
    ]),
    MongooseModule.forFeature([{ name: 'veridaSchema', schema: VeridaSchema }]),
  ],
  controllers: [IssuerController],
  providers: [IssuerService, SchemaService],
  exports: [IssuerService, SchemaService],
})
export class IssuerModule {}
