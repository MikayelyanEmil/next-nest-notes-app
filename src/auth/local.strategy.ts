import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({usernameField: 'email'});
    }

    async validate(email: string, password: string): Promise<any> { 
        const user = await this.authService.validateUser(email, password);
        if (user == null) {
            throw new UnauthorizedException("This user does not exist.");
        }
        else if (user == false) {
            throw new UnauthorizedException("Invalid Password: Please try again.")
        } 
        else return user;
    }
}