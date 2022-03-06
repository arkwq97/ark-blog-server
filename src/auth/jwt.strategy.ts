import { BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { compareSync } from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/db/models/user.model';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET
    } as StrategyOptions);
  }

  async validate(id: string) {
    return await this.userModel.findById(id);
  }
}