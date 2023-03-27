import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserModel } from './schemas/users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserModel>) {}


    private users = [
        {
            "name": "Emil",
            "age": 19,
            "id": 0
        },
        {
            "name": "Goro",
            "age": 18,
            "id": 1
        },
        {
            "name": "Gago",
            "age": 18,
            "id": 2
        }
    ]


    async create(createUserDto: CreateUserDto): Promise<User> {
        // this.users.push({name: createUserDto.name, age: createUserDto.age, id: this.users.length });
        // return `${createUserDto.name} is now added ! and age is of type ${typeof(createUserDto.age)}.`;
        const user = new this.userModel(createUserDto);
        return user.save();
    }

  
    getOne(id) {
        return this.users.filter(u => u.id == id)[0];
    }


    async get() {
        // let result = ``;
        // this.users.forEach(u => {
        //     result += `${u.name} under the id ${u.id} is of age ${u.age}\n`
        // });
        // return result;
        return this.userModel.findOne({ name: "Arsen" }).exec();
    }


    change(id, updateUserDto: UpdateUserDto) {
        try {
            this.users[id].name = updateUserDto.name;
            this.users[id].age = updateUserDto.age;
            return this.users.filter(u => u.id == id)[0]; 
        } catch (error) {
            // return { url: `http://localhost:3000/users/${id}`, statusCode: 500};
            return 'errrror';
        }
    }


    remove(id) {
        let user = this.users.filter(u => u.id == id)[0];
        this.users = this.users.filter(u => u.id != id);
        return user;
    }

}
