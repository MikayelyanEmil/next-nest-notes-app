import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, UserModel } from 'src/users/schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel(User.name) private userModel: Model<UserModel>, private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_ACCESS_SECRET'),
        });
    }

    async validate(payload: any): Promise<any> {
        const email = payload.sub
        const user = await this.userModel.findOne({ email });
        if (!user) return null;
        if (!user.isActivated) throw new ForbiddenException('Please verify your email address.');
        return user;
    }
}

