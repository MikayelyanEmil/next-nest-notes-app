import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Note, NoteModel, User, UserModel } from './schemas/users.schema';
import { CreateNoteDto } from './dto/create-note.dto';





@Injectable()
export class UsersService {
    constructor (
        @InjectModel(User.name) private userModel: Model<UserModel>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { email, password } = createUserDto; 
        let errorMessages = [];
        if (!/^(?!$)([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email)) errorMessages.push('Please enter a valid email address');
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) errorMessages.push('Password must be at least 8 chars long and contain at least one number and one letter');
        if (errorMessages.length) throw new BadRequestException(errorMessages.join(', '));
 
        try {
            const hash = await bcrypt.hash(password, 10);
            let user = new this.userModel({ ...createUserDto, password: hash });
            return await user.save();
        } catch (error) {
            if (error.code === 11000) throw new BadRequestException('Account with that email already exists');            
        }
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

}
