import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrUpdateArticeDto {
  @ApiProperty({ description: '文章标题', example: '女施主请留步' })
  @IsNotEmpty({ message: '文章标题不能为空' })
  title: string
  @ApiProperty({ description: '文章类型', example: 'vue' })
  @IsNotEmpty({ message: '文章类型不能为空' })
  type: string
  @ApiProperty({ description: '文章作者', example: 'arkwq' })
  @IsNotEmpty({ message: '作者不能为空' })
  author: string
  @ApiProperty({ description: '文章创建日期', example: '空值' })
  createdAt: string
  @ApiProperty({ description: '文章更新日期', example: '空值' })
  updatedAt: string
  @ApiProperty({ description: '文章简介', example: '不如从了老衲吧' })
  introduction: string
  @ApiProperty({ description: '文章内容', example: '你这泼猴' })
  content: string
}