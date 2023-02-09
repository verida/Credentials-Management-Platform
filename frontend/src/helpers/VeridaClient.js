import { Client } from "@verida/client-ts";
import { config } from "../config";

const clientConfig = {
  environment: config.veridaEnvironment,
  didServerUrl: config.veridaDefaultTestnetDidserver,
};

export const getClientContext = () => {
  const context = new Client(clientConfig);
  return context;
};

export const getSchemaSpecs = async (schemaId, context) => {
  const schemas = await context.getSchema(schemaId);
  const schemSpecs = await schemas.getSpecification();
  return schemSpecs;
};
