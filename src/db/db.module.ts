import { Global, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { DbService } from './db.service';
import { Article } from './models/article.model';
import { User } from './models/user.model';

const models = TypegooseModule.forFeature([User, Article]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri: process.env.DB
        }
      }
    }),
    models
  ],
  providers: [DbService],
  exports: [DbService, models]
})
export class DbModule { }
