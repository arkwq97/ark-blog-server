import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Article } from 'src/db/models/article.model';
import { CreateOrUpdateArticeDto } from './dto/create-update.dto';

@Controller('articles')
@ApiTags('文章')
export class ArticlesController {
  constructor(
    @InjectModel(Article) private readonly articleModel: ReturnModelType<typeof Article>
  ) { }

  @Get('list:page')
  @ApiOperation({ summary: '按页获取文章列表信息' })
  async getList(@Param('page') page: string) {
    return await this.articleModel.find();
  }

  @Get(':id')
  @ApiOperation({ summary: '按id获取文章信息' })
  getArticle(@Param('id') id: string) {
    return {};
  }

  @Post()
  @ApiOperation({ summary: '创建文章' })
  @UseGuards(AuthGuard('jwt'))
  async createArticle(@Body() createOrUpdateArticeDto: CreateOrUpdateArticeDto) {
    try {
      await this.articleModel.create(createOrUpdateArticeDto);
    } catch (err) {
      return {
        status: '404',
        message: err.message
      }
    }

    return;
  }

  @Put(':id')
  @ApiOperation({ summary: '按id更新文章信息' })
  @UseGuards(AuthGuard('jwt'))
  async updataArticle(@Param('id') id: string, @Body() createOrUpdateArticeDto: CreateOrUpdateArticeDto) {
    return;
  }

  @Delete(':id')
  @ApiOperation({ summary: '按id删除文章' })
  @UseGuards(AuthGuard('jwt'))
  async delArticle(@Param('id') id: string) {
    return;
  }
}
