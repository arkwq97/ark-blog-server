import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'src/db/models/user.model';
import { CurrentUser } from './auth.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
@ApiTags('权限')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>
  ) { }
  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.userModel.create(registerDto);
    return user;
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() loginDto: LoginDto, @CurrentUser() user: DocumentType<User>) {
    return {
      token: this.jwtService.sign(String(user._id))
    };
  }

  @Get('user')
  @ApiOperation({ summary: '获取当前登录用户' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getLoginUser(@CurrentUser() user: DocumentType<User>) {
    return user;
  }
}
