import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SuperAdmin } from './interfaces/super-admin.interface';
import { CreateSuperAdminDto } from './dto';

@Injectable()
export class SuperAdminService {
    constructor(@InjectModel('SuperAdmin') private userModel: Model<SuperAdmin>) {}

    async create(createSADto: CreateSuperAdminDto): Promise<SuperAdmin> {
        const record = new this.userModel(createSADto);
        return record.save();
    }

    async findAll(): Promise<SuperAdmin[]> {
        return this.userModel.find().exec();
    }
}
