import { Body, Controller, Delete, Get, Param, Post, Put, Redirect, Res, Request, UseGuards, Response, BadRequestException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private configService: ConfigService
    ) { }

    @Get('activate/:id')
    async activate(@Param('id') id: string, @Response() res) {
        await this.usersService.activate(id);
        res.redirect(this.configService.get<string>('FRONTEND_URL'));
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
