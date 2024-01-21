import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CommonUserDocument = HydratedDocument<CommonUser>;

@Schema({ id: false })
export class CommonUser {
  @Prop()
  _id: Types.ObjectId;

  @Prop({ required: true })
  fullName: string;
}

export const CommonUserSchema = SchemaFactory.createForClass(CommonUser);
