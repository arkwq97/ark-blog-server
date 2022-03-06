import { prop } from '@typegoose/typegoose';

export class Article {
  @prop()
  public id: string
  @prop()
  title: string
  @prop()
  type: string
  @prop()
  author: string
  @prop()
  createdAt: Date
  @prop()
  updatedAt: Date
  @prop()
  viewCount: number
  @prop()
  introduction: string
  @prop()
  content: string
}