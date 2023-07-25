import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async generateTokens(payload) {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRY')
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRY')
            })
        ]);
        return {
            access_token,
            refresh_token
        }
    }

    async validateUser(email, password): Promise<any> {
        const user = await this.usersService.getByEmail(email);
        try {
            return await bcrypt.compare(password, user.password) ? user : false;
        } catch (error) {
            return null;
        }
    }

    async login(user: CreateUserDto) {
        const payload = { name: user.name, sub: user.email };
        const { access_token, refresh_token } = await this.generateTokens(payload);
        return {
            access_token,
            refresh_token,
            user: payload.name
        }
    }
}
