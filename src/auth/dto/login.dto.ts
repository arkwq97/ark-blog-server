import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ description: '用户名', example: 'ark' })
  username: string
  @ApiProperty({ description: '密码', example: '123456789' })
  password: string
}