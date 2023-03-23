import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
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


    create(createUserDto: CreateUserDto) {
        this.users.push({name: createUserDto.name, age: createUserDto.age, id: this.users.length });
        return `${createUserDto.name} is now added ! and age is of type ${typeof(createUserDto.age)}.`;
    }

  
    getOne(id) {
        return this.users.filter(u => u.id == id)[0];
    }


    get() {
        let result = ``;
        this.users.forEach(u => {
            result += `${u.name} under the id ${u.id} is of age ${u.age}\n`
        });
        return result;
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
