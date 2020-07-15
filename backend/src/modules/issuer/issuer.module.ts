import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IssuerController } from './issuer.controller';
import { IssuerService } from './issuer.service';
import { IssuerSchema } from '../../schemas/issuer.schema';
import { IssuerResponseSchema } from '../../schemas/issuer.response.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Issuer', schema: IssuerSchema }]), MongooseModule.forFeature([{ name: 'IssuerResponse', schema: IssuerResponseSchema }])],
    controllers: [IssuerController],
    providers: [IssuerService],
    exports: [IssuerService]
})
export class IssuerModule {}
