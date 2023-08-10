import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
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
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtRefreshStrategy.extractJwtFromCookie
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_REFRESH_SECRET'),
            passReqToCallback: true
        });
    }

    async validate(req: Request, payload: PayloadDto): Promise<any> {
        const refresh_token = req.cookies.refresh_token;
        if (!refresh_token) throw new UnauthorizedException('False Refresh token')
        const { sub, name } = payload;
        return {
            payload: { sub, name },
            refresh_token
        }
    }

    private static extractJwtFromCookie(req: Request) {
        if (req.cookies && req.cookies.refresh_token) {
            return req.cookies.refresh_token;
        }
        return null;
    }
}

