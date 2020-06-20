import { Module } from '@nestjs/common';
//import { MongooseModule } from '@nestjs/mongoose';
import { CredentialController } from './credential.controller';
import { CredentialService } from './credential.service';

@Module({
    //imports: [MongooseModule.forFeature([{ name: 'Credential' }])],
    controllers: [CredentialController],
    providers: [CredentialService],
})
export class CredentialModule {}
