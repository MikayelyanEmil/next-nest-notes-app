import { Body, Controller, Delete, Get, Param, Post, Put, Redirect, Res, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';



@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login') 
    async login(@Request() req) {
        return req.user;
    }

    @Post('signup') 
    async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        try {
            await this.usersService.create(createUserDto); 
            return res.redirect('http://localhost:3000');
        } catch (error) {            
            res.send('Could not sign you up: Invalid credentials try again.');
        }
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



    // @Get('test')
    // test() {
    //     return this.usersService.getByEmail('mikayelyanemil19@gmail.com')
    // }
}
