import { EnvironmentType } from "@verida/client-ts";

export const config = {
  apiServerURL: process.env.VUE_APP_API_URL,
  tokenKey: process.env.VUE_APP_TOKEN_KEY,
  veridaEnvironment: EnvironmentType.TESTNET,
  veridaContextName: process.env.VUE_APP_CONTEXT_NAME,
  veridaDefaultTestnetDidserver:
    process.env.VUE_APP_VERIDA_TESTNET_DEFAULT_DID_SERVER,
};