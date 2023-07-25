import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type TokenModel = HydratedDocument<Token>;

@Schema()
export class Token {
    @Prop()
    userId: string;

    @Prop()
    refresh_token: string;
}


export const TokenSchema = SchemaFactory.createForClass(Token);

