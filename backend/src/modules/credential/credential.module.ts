import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CredentialController } from './credential.controller';
import { CredentialService } from './credential.service';
import { CredentialSchema } from '../../schemas/credential.schema';

import { UserModule } from '../user/user.module';
import { IssuerModule } from '../issuer/issuer.module';

@Module({
    imports: [UserModule, IssuerModule, MongooseModule.forFeature([{ name: 'Credential', schema: CredentialSchema }])],
    controllers: [CredentialController],
    providers: [CredentialService]
})
export class CredentialModule {}
