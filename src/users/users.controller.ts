import { Body, Controller, Delete, Get, Param, Post, Put, Redirect, Res, Request, UseGuards, Response, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-access.guard';


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login') 
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
 
    @Post('signup')
    async create(@Body() createUserDto: CreateUserDto) { 
        // const user = await this.authService.signup(createUserDto);
        return this.authService.signup(createUserDto);  
    }

    @Get('refresh')
    async refresh() {
        
    }

    @Get('activate')
    async activate() {
        
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
