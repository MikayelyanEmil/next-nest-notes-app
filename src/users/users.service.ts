import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserModel } from './schemas/users.schema';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserModel>) {}


    private users = []


    async create(createUserDto: CreateUserDto): Promise<User> {
        // this.users.push({name: createUserDto.name, age: createUserDto.age, id: this.users.length });
        // return `${createUserDto.name} is now added ! and age is of type ${typeof(createUserDto.age)}.`;
        const user = new this.userModel(createUserDto);
        return user.save();
    }

  
    async getOne(id): Promise<User> {
        // return this.users.filter(u => u.id == id)[0];
        return this.userModel.findById(id).exec();

    }


    async get(): Promise<User[]> {
        // let result = ``;
        // this.users.forEach(u => {
        //     result += `${u.name} under the id ${u.id} is of age ${u.age}\n`
        // });
        // return result;
        return this.userModel.find().exec();
    }


    async change(id, updateUserDto: UpdateUserDto): Promise<User | string> {
        // try {
        //     this.users[id].name = updateUserDto.name;
        //     this.users[id].age = updateUserDto.age;
        //     return this.users.filter(u => u.id == id)[0]; 
        // } catch (error) {
        //     // return { url: `http://localhost:3000/users/${id}`, statusCode: 500};
        //     return 'errrror';
        // }
        
        return this.userModel.findByIdAndUpdate(id, updateUserDto, {returnDocument: "after"}).exec();
    }


    remove(id) {
        // let user = this.users.filter(u => u.id == id)[0];
        // this.users = this.users.filter(u => u.id != id);
        // return user;
        return this.userModel.findByIdAndDelete(id, {returnDocument: "after"});
    }

}
