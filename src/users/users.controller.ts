import { Body, Controller, Delete, Get, Param, Post, Put, Redirect } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';



@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('new')
    create(@Body() createUserDto: CreateUserDto) {
        // users.push({name: createUserDto.name, age: createUserDto.age, id: users.length });
        // return `${createUserDto.name} is now added ! and age is of type ${typeof(createUserDto.age)}.`;
        return this.usersService.create(createUserDto);
    }

    @Get(':id')
    getOne(@Param('id') id) {
        // return users.filter(u => u.id == id)[0];
        return this.usersService.getOne(id);
    }

    @Get()
    get() {
        // let result = ``;
        // users.forEach(u => {
        //     result += `${u.name} under the id ${u.id} is of age ${u.age}\n`
        // });
        // return result;
        return this.usersService.get();
    }

    @Put(':id')
    change(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
        // try {
        //     users[id].name = updateUserDto.name;
        //     users[id].age = updateUserDto.age;
        //     return users.filter(u => u.id == id)[0]; 
        // } catch (error) {
        //     // return { url: `http://localhost:3000/users/${id}`, statusCode: 500};
        //     return 'errrror';
        // }
        return this.usersService.change(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id) {
        // let user = users.filter(u => u.id == id)[0];
        // users = users.filter(u => u.id != id);
        // return user;
        return this.usersService.remove(id);
    }
}
