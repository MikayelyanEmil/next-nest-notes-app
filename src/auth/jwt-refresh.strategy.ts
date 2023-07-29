import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { jwtConstants } from './constants';
import { User, UserModel } from 'src/users/schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { PayloadDto } from './dto/payload.dto';


@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(@InjectModel(User.name) private userModel: Model<UserModel>, private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_REFRESH_SECRET'),
            passReqToCallback: true
        });
    }

    async validate(req: Request, payload: PayloadDto): Promise<any> {
        const refresh_token = req
            ?.get('authorization')
            ?.replace('Bearer', '')
            .trim();
        if (!refresh_token) throw new UnauthorizedException('False Refresh token')
        const { sub, name } = payload;
        return {
            payload: { sub, name },
            refresh_token
        }
    }
}

