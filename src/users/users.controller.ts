import { Body, Controller, Delete, Get, Param, Post, Put, Redirect, Res, Request, UseGuards, Response, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('test')
    async test(@Request() req, @Body() createNoteDto: CreateNoteDto) {         
        // const user = await this.usersService.getByEmail(req.user.sub);
        return this.usersService._testForPopulate(createNoteDto, req.user.sub);
    }

    @UseGuards(JwtAuthGuard)
    @Get('verify')
    verify(@Request() req) {
        return req.user;
    }

    @UseGuards(LocalAuthGuard)
    @Post('login') 
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
 
    @Post('signup')
    async create(@Body() createUserDto: CreateUserDto) { 
        let errorMessages = [];
        if (!/^(?!$)([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(createUserDto.email)) errorMessages.push('Please enter a valid email address');
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(createUserDto.password)) errorMessages.push('Password must be at least 8 chars long and contain at least one number and one letter');
        if (errorMessages.length) throw new BadRequestException(errorMessages.join(', '));
        const user = await this.usersService.create(createUserDto);
        return this.authService.login(user);
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
