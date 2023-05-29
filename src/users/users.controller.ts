import { Body, Controller, Delete, Get, Param, Post, Put, Redirect, Res, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';



@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) { }

    // @UseGuards(JwtAuthGuard)
    // @Get('tests')
    // test(@Request() req) {
    //     return 'Protected Route ' + req.user.email;
    // }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
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



}
