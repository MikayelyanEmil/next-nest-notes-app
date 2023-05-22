import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async validateUser(email, password): Promise<any> {
        const user = await this.usersService.getByEmail(email);
        try {
           return user.password === password ? user : false;
        } catch (error) {
           return null; 
        }
    }
}
