import { Prop } from "@typegoose/typegoose";
import { hashSync } from 'bcryptjs'

export class User {
  @Prop()
  username: string
  @Prop({
    select: false,
    set(val) {
      return val ? hashSync(val) : val;
    }
  })
  password: string
}