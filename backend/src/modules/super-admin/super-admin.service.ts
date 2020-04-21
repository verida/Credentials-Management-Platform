import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SuperAdmin } from './interfaces/super-admin.interface';
import { CreateSuperAdminDto } from './dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class SuperAdminService {
    constructor(@InjectModel('SuperAdmin') private userModel: Model<SuperAdmin>) {}

    async create(createSADto: CreateSuperAdminDto): Promise<SuperAdmin> {
        const password = bcrypt.hashSync(createSADto.password, process.env.SALT);

        const data = {...createSADto, password };
        const record = new this.userModel(data);
        return record.save();
    }

    async findAll(): Promise<SuperAdmin[]> {
        return this.userModel.find().exec();
    }

    async findOne(email: string): Promise<SuperAdmin> {
        return this.userModel.findOne({ email })
    }
}
