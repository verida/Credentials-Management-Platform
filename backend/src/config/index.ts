import { EnvironmentType } from '@verida/types';

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
  polygonPrivateKey: process.env.POLYGON_PRIVATE_KEY,
  rpcUrl: process.env.RPC_URL,
  veridaDefaultDidServers: [
    process.env.VERIDA_DEFAULT_DID_SERVERS_NODE1,
    process.env.VERIDA_DEFAULT_DID_SERVERS_NODE2,
    process.env.VERIDA_DEFAULT_DID_SERVERS_NODE3
  ],
  veridaDefaultStorageNodes: [
    process.env.VERIDA_DEFAULT_STORAGE_NODE1,
    process.env.VERIDA_DEFAULT_STORAGE_NODE2,
    process.env.VERIDA_DEFAULT_STORAGE_NODE3
  ]
});
