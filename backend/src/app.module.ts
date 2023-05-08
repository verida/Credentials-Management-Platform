import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';
import { CredentialModule } from './modules/credential/credential.module';
import { IssuerModule } from './modules/issuer/issuer.module';
import { AuthModule } from './modules/auth/auth.module';
import { SchemaModule } from './modules/schema/schema.module';
import { config } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000),
        ENABLE_CORS: Joi.boolean().default(true),
        DB_URL: Joi.string().required(),
        SALT: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        VERIDA_ENVIRONMENT: Joi.string().default('testnet'),
        POLYGON_PRIVATE_KEY: Joi.string().required(),
        RPC_URL: Joi.string().required(),
        VERIDA_APP_NAME: Joi.string().required(),
        // TODO: Remove when not needed
        VERIDA_DEFAULT_DID_SERVERS_NODE1: Joi.string().required(),
        VERIDA_DEFAULT_DID_SERVERS_NODE2: Joi.string().required(),
        VERIDA_DEFAULT_DID_SERVERS_NODE3: Joi.string().required(),
        VERIDA_DEFAULT_STORAGE_NODE1: Joi.string().required(),
        VERIDA_DEFAULT_STORAGE_NODE2: Joi.string().required(),
        VERIDA_DEFAULT_STORAGE_NODE3: Joi.string().required(),
      }),
    }),
    MongooseModule.forRoot(config().dbURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    SchemaModule,
    UserModule,
    AdminModule,
    CredentialModule,
    IssuerModule,
    AuthModule,
  ],
})
export class AppModule {}
