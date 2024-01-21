import { Types } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export default class ObjectIdParam {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  @Transform(({ value }) => {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid Id');
    }

    return Types.ObjectId.createFromHexString(value);
  })
  id: Types.ObjectId;
}
