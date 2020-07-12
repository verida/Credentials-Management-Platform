import {Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";

import Verida from "@verida/datastore"

const SCHEMAS = [
    "https://schemas.verida.io/health/pathology/tests/covid19-pcr/schema.json"
];

@UseGuards(AuthGuard('jwt'))
@Controller('schema')
export class SchemaController {
    constructor() {}

    @Get()
    findAll(): Promise<any[]> {
        const schemas = SCHEMAS.map(schema => Verida.getSchema(schema, true));
        return Promise.all(schemas);
    }
}
