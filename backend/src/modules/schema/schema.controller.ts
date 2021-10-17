import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import Verida from '@verida/datastore';

const SCHEMAS = [
  'https://schemas.testnet.verida.io/health/pathology/tests/cholesterol/total/schema.json',
  'https://schemas.testnet.verida.io/health/pathology/tests/covid19/pcr/schema.json',
  'https://schemas.testnet.verida.io/health/pathology/tests/glucose/fasting/schema.json',
  'https://schemas.testnet.verida.io/health/pathology/tests/haemoglobin/schema.json',
  'https://schemas.testnet.verida.io/health/pathology/tests/syphilis/ab/schema.json',
];

@UseGuards(AuthGuard('jwt'))
@Controller('schema')
export class SchemaController {
  @Get()
  findAll(): Promise<any[]> {
    const schemas = SCHEMAS.map(schema => Verida.getSchema(schema, true));
    return Promise.all(schemas);
  }
}
