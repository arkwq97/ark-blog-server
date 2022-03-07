import { BadRequestException, Body, Controller, createParamDecorator, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Article } from 'src/db/models/article.model';
import { CreateOrUpdateArticeDto } from './dto/create-or-update.dto';

@Controller('articles')
@ApiTags('文章')
export class ArticlesController {
  constructor(
    @InjectModel(Article) private readonly articleModel: ReturnModelType<typeof Article>
  ) { }

  @Get('count')
  @ApiOperation({ summary: '获取文章数量' })
  async getCount() {
    return await this.articleModel.count();
  }

  @Get('list:page')
  @ApiOperation({ summary: '按页获取文章列表信息' })
  async getList(@Param('page') page: string) {
    const numberPage = Number(page) - 1;
    if (isNaN(numberPage) || numberPage < 0) {
      throw new BadRequestException('页码必须为数字，且必须大于1');
    }
    return await this.articleModel.find().skip(numberPage * 12).limit(12);
  }

  @Get(':id')
  @ApiOperation({ summary: '按id获取文章信息' })
  async getArticle(@Param('id') id: string) {
    return await this.articleModel.findById(id).select('+content');
  }

  @Post()
  @ApiOperation({ summary: '创建文章' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async createArticle(@Body() createOrUpdateArticeDto: CreateOrUpdateArticeDto) {
    const now = new Date().toJSON();
    createOrUpdateArticeDto.createdAt = now;
    createOrUpdateArticeDto.updatedAt = now;
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updataArticle(@Param('id') id: string, @Body() createOrUpdateArticeDto: CreateOrUpdateArticeDto) {
    createOrUpdateArticeDto.updatedAt = new Date().toJSON();
    return await this.articleModel.findByIdAndUpdate(id, createOrUpdateArticeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '按id删除文章' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async delArticle(@Param('id') id: string) {
    return await this.articleModel.findByIdAndDelete(id);
  }
}