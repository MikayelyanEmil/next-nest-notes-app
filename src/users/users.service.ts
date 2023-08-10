import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserModel } from './schemas/users.schema';

 
@Injectable()
export class UsersService {
    constructor (
        @InjectModel(User.name) private userModel: Model<UserModel>
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        return new this.userModel(createUserDto).save();
    }


    async getOne(id): Promise<User> {
        return this.userModel.findById(id).exec();
    }


    async get(): Promise<User[]> {        
        return this.userModel.find().exec();
    }


    async change(id, updateUserDto: UpdateUserDto): Promise<User | string> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { returnDocument: "after" }).exec();
    }


    remove(id) {
        return this.userModel.findByIdAndDelete(id, { returnDocument: "after" });
    }


    getByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }

    async activate(activationId) {
        await this.userModel.updateOne({ activationId }, { isActivated: true });
    }
}
