import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserModel = HydratedDocument<User>; 

export class User {
    @Prop()
    name: string;

    @Prop()
    age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);