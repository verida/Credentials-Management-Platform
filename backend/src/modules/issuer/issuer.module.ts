import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IssuerController } from './issuer.controller';
import { IssuerService } from './issuer.service';
import { IssuerSchema } from '../../schemas/issuer.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Issuer', schema: IssuerSchema }])],
    controllers: [IssuerController],
    providers: [IssuerService],
})
export class IssuerModule {}
