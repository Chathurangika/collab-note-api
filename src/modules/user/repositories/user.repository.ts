import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "../schemas/user.schema";
import { FilterQuery, Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { EditUserDto } from "../dto/editUser.dto";
import { UserEnabledDto } from "../dto/user-enabled.dto";
import { SearchUserDto } from "../dto/searchUser.dto";

@Injectable()
export class UserRepository {

    constructor(
        @InjectModel(User.name) private readonly user: Model<UserDocument>,
    ) { }

    async findAllOnSearch(userId:Types.ObjectId,query: SearchUserDto) {
        const validSortFields = [
            '_id',
            'firstName',
            'lastName',
        ];

        let sortKey = '_id';

        if (validSortFields.includes(query.sortKey)) {
            sortKey = query.sortKey;
        }
        const where: FilterQuery<UserDocument> = {'_id':{ $ne: userId }};

        if (!!query.keyword) {
            where.$or = [
                { email: { $regex: `${query.keyword}`, $options: 'i' } },
                { firstName: { $regex: `${query.keyword}`, $options: 'i' } },
                { lastName: { $regex: `${query.keyword}`, $options: 'i' } },
            ];
        }

        const results = await this.user
            .find(where)
            .sort([[sortKey, query.sortDirection]]);

        const userList = results.map((user) => ({
            email: user.email,
            fullName: `${user.firstName} ${user.lastName}`,
            id: user._id,
            enabled: user.enabled
        }));

        return userList;
    }

    createOne(data: User) {
        return this.user.create(data);
    }

    async findOne(id: Types.ObjectId) {
        return await this.user.findById({ _id: id });
    }

    findOneByEmail(email: string) {
        return this.user.findOne({ email });
    }

    findOneByUsername(username: string) {
        return this.user.findOne({ username });
    }

    deleteOne(id: Types.ObjectId) {
        return this.user.deleteOne({ _id: id });
    }

    updateOne(
        id: Types.ObjectId,
        data: EditUserDto,
    ) {
        return this.user.findOneAndUpdate(
            { _id: id },
            { firstName: data.firstName, lastName: data.lastName },
            { new: true },
        );
    }

    updateIsActive(
        id: Types.ObjectId,
        data: UserEnabledDto,
    ) {
        return this.user.findOneAndUpdate(
            { _id: id },
            { enabled: data.enabled },
            { new: true },
        );
    }

    changePassword(
        id: Types.ObjectId,
        hashedPassword: string,
    ) {
        return this.user.findOneAndUpdate(
            { _id: id },
            { password: hashedPassword },
            { new: true },
        );
    }
}
