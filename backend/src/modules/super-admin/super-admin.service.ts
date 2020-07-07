import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SuperAdmin } from './interfaces/super-admin.interface';
import { CreateSuperAdminDto } from './dto';

import * as bcrypt from 'bcrypt';
import { SALT } from "../../configs";

@Injectable()
export class SuperAdminService {
    constructor(@InjectModel('SuperAdmin') private userModel: Model<SuperAdmin>) {}

    async create(createSADto: CreateSuperAdminDto): Promise<SuperAdmin> {
        const passwordHash = bcrypt.hashSync(createSADto.password, SALT);
        const record = new this.userModel({
            email: createSADto.email,
            passwordHash
        });
        return record.save();
    }

    async findAll(): Promise<SuperAdmin[]> {
        return this.userModel.find().exec();
    }

    async findOne(email: string): Promise<SuperAdmin> {
        return this.userModel.findOne({ email })
    }
}
