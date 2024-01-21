import { HydratedDocument } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { NoteContentUpdator } from 'src/common/enum';
import { CommonUser } from 'src/common/schema/common-user.schema';


export type NoteContentUpdateDocument = HydratedDocument<NoteContentUpdate>;

@Schema({ _id:false,timestamps: true })
export class NoteContentUpdate {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true, enum: NoteContentUpdator })
  from: NoteContentUpdator;

  @Prop({ required: true })
  order: number;

  @Prop({ required: true, schema: CommonUser })
  editedBy: CommonUser;
}

export const NoteContentUpdateSchema =
  SchemaFactory.createForClass(NoteContentUpdate);
