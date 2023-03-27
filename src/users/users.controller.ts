import { Body, Controller, Delete, Get, Param, Post, Put, Redirect } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';



@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('new')
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get(':id')
    getOne(@Param('id') id) {
        return this.usersService.getOne(id);
    }

    @Get()
    get() {
        return this.usersService.get();
    }

    @Put(':id')
    change(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.change(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id) {
        return this.usersService.remove(id);
    }
}
