import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async create(user: CreateUserDto): Promise<User> {
        const record = new this.userModel(user);
        record.passwordHash = bcrypt.hashSync(user.password, process.env.SALT);
        return record.save();
    }

    async findOne(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ email })
    }

    async findOneById(userId: string): Promise<User | undefined> {
        return this.userModel.findOne({ _id: userId })
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }
}
