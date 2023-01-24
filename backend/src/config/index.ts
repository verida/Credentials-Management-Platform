import { EnvironmentType } from '@verida/client-ts';

const veridaEnvironment: EnvironmentType =
  process.env.VERIDA_ENVIRONMENT === 'local'
    ? EnvironmentType.LOCAL
    : process.env.VERIDA_ENVIRONMENT === 'mainnet'
    ? EnvironmentType.MAINNET
    : EnvironmentType.TESTNET;

export const config = () => ({
  veridaEnvironment,
  salt: process.env.SALT,
  dbURL: process.env.DB_URL,
  nodeEnv: process.env.NODE_ENV,
  corsHost: process.env.CORS_HOSTS,
  jwtSecret: process.env.JWT_SECRET,
  enableCors: process.env.ENABLE_CORS,
  veridaAppName: process.env.VERIDA_APP_NAME,
  polygonTestnetRpcURL: process.env.POLYGON_TESTNET_RPC_URL,
  polygonTestnetPrivateKey: process.env.POLYGON_TESTNET_PRIVATE_KEY,
  veridaTestnetDefaultServer: process.env.VERIDA_TESTNET_DEFAULT_SERVER,
  veridaTestnetDefaultDidServerNode1:
    process.env.VERIDA_TESTNET_DEFAULT_DID_SERVERS_NODE1,
});
