import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserModel = HydratedDocument<User>; 

@Schema()
export class User {
    @Prop(
        {
            required: true,
            // validate: {
            //     validator: function(email) {
            //       const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            //       return emailRegex.test(email);
            //     },
            //     message: 'Please enter a valid email address'
            //   }
        }
    )
    email: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);