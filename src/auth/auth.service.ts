import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser( email, password): Promise<any> {        
        const user = await this.usersService.getByEmail(email);
        try {
            return user.password === password ? user : false;
        } catch (error) {
            return null;
        }
    }

    async login(user: CreateUserDto) {
        const payload = { name: user.name, sub: user.email };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
