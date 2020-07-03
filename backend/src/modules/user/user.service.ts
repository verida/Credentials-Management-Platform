import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: ReturnModelType<typeof User>) {}

    async create(createCatDto: CreateUserDto): Promise<User> {
        const record = new this.userModel(createCatDto);
        return record.save();
    }

    async findOne(email): Promise<User> {
        return this.userModel.findOne(email)
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }
}
