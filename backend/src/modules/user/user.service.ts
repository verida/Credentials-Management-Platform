import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto';
import {SuperAdmin} from "../super-admin/interfaces/super-admin.interface";

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) {}

    async create(createCatDto: CreateUserDto): Promise<User> {
        const record = new this.userModel(createCatDto);
        return record.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(email: string): Promise<SuperAdmin> {
        return this.userModel.findOne({ email })
    }
}
