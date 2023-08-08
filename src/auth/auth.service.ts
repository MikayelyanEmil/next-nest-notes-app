import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { User, UserModel } from 'src/users/schemas/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MailService } from './mail.service';
import { Token, TokenModel } from './schemas/token.schema';
import { LoginDto } from './dto/login.dto';


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

    async refreshToken(payload, refresh_token) {
        const user = await this.usersService.getByEmail(payload.sub);
        if (!user) throw new ForbiddenException('User does not exist.')
        const token = await this.tokenModel.findOne({ userId: user.id });
        if (!token) throw new ForbiddenException('Refresh token was not found for the user.');

        const tokensMatch = await bcrypt.compare(refresh_token, token.refresh_token);
        if (!tokensMatch) throw new ForbiddenException('Invalid refresh token.');

        const tokens = await this.generateTokens(payload);
        await this.saveRefreshToken;
        return {
            ...tokens,
            user: {
                name: payload.name,
                id: user.id
            }
        }
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
        return this.tokenModel.findOneAndUpdate({ userId }, { refresh_token: await bcrypt.hash(refresh_token, 10) }, { upsert: true });
    }

    async validateUser(email, password): Promise<any> {
        const user = await this.usersService.getByEmail(email);
        try {
            return await bcrypt.compare(password, user.password) ? user : false;
        } catch (error) {
            return null;
        }
    }

    async login(user: LoginDto) {
        const payload = { id: user.id, name: user.name, sub: user.email };
        const tokens = await this.generateTokens(payload);
        await this.saveRefreshToken(user.id, tokens.refresh_token);
        return {
            ...tokens,
            user: {
                name: payload.name,
                id: user.id
            }
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
            user = await this.usersService.create({ ...createUserDto, password: hash, activationId });
        } catch (error) {
            if (error.code === 11000) throw new BadRequestException('Account with that email already exists');
        }

        await this.mailService.sendActivationMail(email, `${this.configService.get<string>("BACKEND_URL")}/users/activate/${activationId}`);
        const payload = { id: user.id, name: user.name, sub: user.email };
        const tokens = await this.generateTokens(payload);
        await this.saveRefreshToken(user.id, tokens.refresh_token);
        return {
            ...tokens,
            user: {
                name: payload.name,
                id: user.id
            }
        }
    }

    async logout(userId, refresh_token): Promise<Token> {
        return await this.tokenModel.findOneAndDelete({ userId });
    }
}


