import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
// import { User } from 'src/users/schemas/users.schema';
import { v4 as uuidv4 } from 'uuid';
import { User, UserModel } from 'src/users/schemas/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MailService } from './mail.service';
import { Token, TokenModel } from './schemas/token.schema';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private mailService: MailService,
        @InjectModel(User.name) private userModel: Model<UserModel>,
        @InjectModel(Token.name) private tokenModel: Model<TokenModel>
    ) { }

    async refreshToken() {

    }

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

    async saveRefreshToken(userId, refresh_token): Promise<Token> {
        return this.tokenModel.findOneAndUpdate({userId}, { refresh_token }, {upsert: true});
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


    async signup(createUserDto: CreateUserDto): Promise<any> {

        const { email, password } = createUserDto;
        let errorMessages = [];
        if (!/^(?!$)([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email)) errorMessages.push('Please enter a valid email address');
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) errorMessages.push('Password must be at least 8 chars long and contain at least one number and one letter');
        if (errorMessages.length) throw new BadRequestException(errorMessages.join(', '));

        const hash = await bcrypt.hash(password, 10);
        const activationId = uuidv4();

        let user;
        try {
            user = await this.usersService.create({...createUserDto, password: hash});
        } catch (error) {
            if (error.code === 11000) throw new BadRequestException('Account with that email already exists');
        }

        await this.mailService.sendActivationMail(email, `$`);
        const payload = { name: user.name, sub: user.email };
        const tokens = await this.generateTokens(payload);
        await this.saveRefreshToken(user.id, tokens.refresh_token);
        return {
            ...tokens,
            user: payload.name
        }
    }
}


