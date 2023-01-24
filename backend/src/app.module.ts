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
      load:[config],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000),
        ENABLE_CORS: Joi.boolean().default(true),
        CORS_HOSTS: Joi.string().default('*'),
        DB_URL: Joi.string().required(),
        SALT: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        VERIDA_ENVIRONMENT: Joi.string().default('testnet'),
        POLYGON_TESTNET_PRIVATE_KEY: Joi.string().required(),
        POLYGON_TESTNET_RPC_URL: Joi.string().required(),
        VERIDA_APP_NAME: Joi.string().required(),
        VERIDA_TESTNET_DEFAULT_SERVER: Joi.string().default(
          'https://db.testnet.verida.io:5002/',
        ),
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
