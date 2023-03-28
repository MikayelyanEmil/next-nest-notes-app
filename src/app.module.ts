import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';



@Module({
  imports: [
    UsersModule, 
    // MongooseModule.forRoot(`mongodb+srv://emil:dfgsap@cluster-for-nestjs.a6khylg.mongodb.net/?retryWrites=true&w=majority`)
    MongooseModule.forRoot(`mongodb+srv://emil:dfgsap@cluster-for-nestjs.a6khylg.mongodb.net/test`)
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
