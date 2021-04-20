import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { SpotifyStrategy } from './strategies/spotify.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/constants';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [PassportModule, UsersModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '7d' },
  })],
  controllers: [AuthController],
  providers: [AuthService, SpotifyStrategy, JwtStrategy],
})
export class AuthModule {} 


