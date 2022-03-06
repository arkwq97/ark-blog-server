import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DbModule } from 'src/db/db.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: process.env.SECRET
        }
      }
    }),
    DbModule,
    PassportModule
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy]
})
export class AuthModule { }
