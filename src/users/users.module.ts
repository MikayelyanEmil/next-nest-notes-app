import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TokenService } from '../auth/token.service';
import { MailService } from './mail.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
        ]),
        forwardRef(() => AuthModule)
    ],
    controllers: [UsersController],
    providers: [UsersService, MailService],
    exports: [UsersService]
})
export class UsersModule { }
