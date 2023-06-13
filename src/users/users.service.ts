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
    constructor(
        @InjectModel(User.name) private userModel: Model<UserModel>,
        @InjectModel(Note.name) private noteModel: Model<NoteModel>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { name, email, password } = createUserDto;  
        try {
            const hash = await bcrypt.hash(password, 10);
            let user = new this.userModel({ ...createUserDto, password: hash });
            return await user.save();
        } catch (error) {
            if (error.code === 11000) throw new BadRequestException('Account with that email already exists');            
            // let errorFields = Object.keys(error.errors);
            // let message = errorFields.reduce((e1, e2) => error.errors[e1].message + ', ' + error.errors[e2].message);
            // throw new BadRequestException(message);
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


    async _testForPopulate(createNoteDto: CreateNoteDto, email) {
        const note = new this.noteModel(createNoteDto);
        await note.save();
        const user = await this.userModel.findOne({ email });
        user.notes.push(note.id);
        await user.save();
        console.log(user);
        await user.populate('notes');
        console.log(user);

        console.log(note);

    }
}
