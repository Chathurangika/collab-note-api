
import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CommonUser, CommonUserSchema } from 'src/common/schema/common-user.schema';
import { NoteContentUpdateDocument, NoteContentUpdateSchema } from './note-content-update.schema';
import { User } from 'src/modules/user/schemas/user.schema';


export type NoteDocument = HydratedDocument<Note>;

@Schema({ timestamps: true })
export class Note {

    @Prop({ required: true })
    title: string;

    @Prop({ required: true, schema: CommonUserSchema })
    owner: CommonUser;

    @Prop({ required: true, ref: User.name })
    sharedUsers: Types.ObjectId[];

    @Prop({
        default: [],
        schema: NoteContentUpdateSchema,
        type: [NoteContentUpdateSchema],
    })
    contentUpdates: NoteContentUpdateDocument[];

}

export const NoteSchema = SchemaFactory.createForClass(Note);
