import { prop } from '@typegoose/typegoose';

export class Article {
  @prop({
    unique: true
  })
  title: string
  @prop()
  type: string
  @prop()
  author: string
  @prop()
  createdAt: string
  @prop()
  updatedAt: string
  @prop()
  viewCount: number
  @prop()
  introduction: string
  @prop({
    select: false
  })
  content: string
}