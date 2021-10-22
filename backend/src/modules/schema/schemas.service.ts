import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { SchemaModel } from 'src/models/Schemas';
import { InjectModel } from '@nestjs/mongoose';
import VeridaHelper from 'src/helpers/VeridaHelper';
import { SCHEMAS } from 'src/utils/schemas';
import { SchemaUser } from './interfaces/schema.interface';

@Injectable()
export class SchemaService {
  constructor(
    @InjectModel('veridaSchema') private schemasModel: Model<SchemaModel>,
  ) {}

  async saveSchema(
    user: SchemaUser,
    schemaUrl: string,
  ): Promise<SchemaModel[]> {
    const schemaExist = await this.schemasModel.findOne({
      schemaUrl,
      userId: user.id,
    });

    if (schemaExist) throw new Error('Schema Url  already exists!');

    const schema = await VeridaHelper.getSchemaJSon(user, schemaUrl);

    const data = {
      schemaUrl,
      userId: user._id,
      title: schema.title,
    };

    const record = new this.schemasModel(data);
    await record.save();
    return this.getSchemas(user._id);
  }

  async saveDefaultSchema(user: SchemaUser): Promise<SchemaModel[]> {
    const schemas = await Promise.all(
      SCHEMAS.map(schema => VeridaHelper.getSchemaJSon(user, schema)),
    );

    const data = schemas.map(item => ({
      title: item.title,
      schemaUrl: item.$id,
      userId: user._id,
    }));

    this.schemasModel.insertMany(data);
    return this.getSchemas(user._id);
  }

  async getSchemas(userId: string): Promise<SchemaModel[]> {
    return this.schemasModel.find({ userId: userId });
  }

  async delete(schemaId: string): Promise<unknown> {
    const response = await this.schemasModel.deleteOne({ _id: schemaId });

    return response;
  }
}
