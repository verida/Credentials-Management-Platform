import { Client, EnvironmentType } from "@verida/client-ts";

const { VUE_APP_VERIDA_TESTNET_DEFAULT_DID_SERVER } = process.env;

const clientConfig = {
	environment: EnvironmentType.TESTNET,
	didServerUrl: VUE_APP_VERIDA_TESTNET_DEFAULT_DID_SERVER,
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
