import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './interfaces/admin.interface';
import { CreateAdminDto } from './dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
    constructor(@InjectModel('Admin') private userModel: Model<Admin>) {}

    async create(createSADto: CreateAdminDto): Promise<Admin> {
        const passwordHash = bcrypt.hashSync(createSADto.password, process.env.SALT);
        const record = new this.userModel({
            email: createSADto.email,
            passwordHash
        });
        return record.save();
    }

    async findAll(): Promise<Admin[]> {
        return this.userModel.find().exec();
    }

    async findOne(email: string): Promise<Admin> {
        return this.userModel.findOne({ email })
    }
}
