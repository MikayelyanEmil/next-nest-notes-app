import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

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

export const NoteSchema = SchemaFactory.createForClass(Note);
