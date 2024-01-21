import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Note, NoteDocument } from "../schemas/note.schema";
import { ClientSession, FilterQuery, Model, Types } from "mongoose";
import { NoteContentUpdate, NoteContentUpdateDocument } from "../schemas/note-content-update.schema";

@Injectable()
export class NoteRepository {

  constructor(
    @InjectModel(Note.name) private readonly note: Model<NoteDocument>,
  ) { }

  async findAllToUser(userId: Types.ObjectId) {

    const where: FilterQuery<NoteDocument> = { 'owner': userId };
    const results = await this.note
      .find(where)
      .sort([["_id", -1]]);

    return results;

  }

  createOne(data: Note) {
    return this.note.create(data);
  }

  findOne(id: Types.ObjectId) {
    return this.note.findOne({ _id: id });
  }
  deleteOne(id: Types.ObjectId) {
    return this.note.deleteOne({ _id: id });
  }

  updateOne(
    id: Types.ObjectId,
    userId: Types.ObjectId,
    data: NoteContentUpdateDocument,
    session?: ClientSession,
  ) {
    return this.note.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          sharedUsers: {
            userId: userId,
            contentUpdates: data
          },
        },
      },
      { new: true, session },
    );
  }


  shareNote(
    noteId: Types.ObjectId,
    users: Types.ObjectId[],
    session?: ClientSession,
  ) {
    return this.note.findOneAndUpdate(
      { _id: noteId },
      {
        $push: {
          sharedUsers: users,
        },
      },
      { new: true, session },
    );
  }

  addContent(id: Types.ObjectId, data: NoteContentUpdate) {
    return this.note.findByIdAndUpdate(
      id,
      {
        $push: {
          contentUpdates: data,
        },
      },
      { new: true },
    );
  }

}
