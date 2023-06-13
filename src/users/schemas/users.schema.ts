import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type UserModel = HydratedDocument<User>;
export type NoteModel = HydratedDocument<Note>;

@Schema()
export class Note {
    @Prop()
    title: string;

    @Prop()
    description: string;

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    // user: mongoose.Schema.Types.ObjectId;
}

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop(
        {
            unique: true,
            required: [true, 'Email is required'],
            // validate: {
            //     validator: function (email) {
            //         const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            //         return emailRegex.test(email);
            //     },
            //     message: 'Please enter a valid email address'
            // }
        }
    )
    email: string;

    @Prop(
        {
            required: [true, 'Password is required']
            // validate: {
            //     validator: function (password) {
            //         const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            //         return passwordRegex.test(password);
            //     },
            //     message: 'Password must be at least 8 chars long and contain at least one number and one letter'
            // }
        }
    )
    password: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }] })
    notes: Note[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export const NoteSchema = SchemaFactory.createForClass(Note);
