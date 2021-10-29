import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { SchemaService } from './schemas.service';
import { SchemaModel } from '../../models/Schemas';
import { UserService } from '../user/user.service';
import VeridaHelper from 'src/helpers/VeridaHelper';
import { UserIdentity } from 'src/models/User';
// import Verida from '@verida/datastore';
// import { SCHEMAS } from 'src/utils/schemas';

@UseGuards(AuthGuard('jwt'))
@Controller('schema')
export class SchemaController {
  constructor(
    private authService: AuthService,
    private schemaService: SchemaService,
    private userService: UserService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Headers() headers): Promise<unknown> {
    const user = (await this.authService.userByToken(headers)) as UserIdentity;
    const response = await this.schemaService.getSchemas(user['issuerId']);

    const schemas = await Promise.all(
      response.map(schema =>
        VeridaHelper.getSchemaJSon(user.issuer, schema.schemaUrl),
      ),
    );

    // const test = SCHEMAS.map(schema => Verida.getSchema(schema, true));
    // return Promise.all(test);

    return schemas;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/list')
  async findAllInCollection(@Headers() headers): Promise<SchemaModel[]> {
    const user = await this.authService.userByToken(headers);
    const response = await this.schemaService.getSchemas(user['issuerId']);
    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async addNew(@Headers() headers, @Body() data): Promise<SchemaModel[]> {
    const user = (await this.authService.userByToken(headers)) as UserIdentity;
    const schemaUrl = data.schemaUrl;

    const response = await this.schemaService.saveSchema(
      user.issuer,
      schemaUrl,
    );
    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteSchema(@Param('id') id: string): Promise<unknown> {
    return this.schemaService.delete(id);
  }
}
