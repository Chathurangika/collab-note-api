import { isEmail } from 'validator';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  
  @Prop({ required: true, validate: [isEmail, 'invalid email'] })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ required: true, default: true })
  enabled: boolean;


}

export const UserSchema = SchemaFactory.createForClass(User);
