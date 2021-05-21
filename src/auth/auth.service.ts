import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import IPayload from '../common/interfaces/payload.interface';
import axios from 'axios';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async login(payload: IPayload): Promise<any> {
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async updateOrCreate(userDto: any): Promise<User> {
    return this.usersService.updateOrCreate(userDto);
  }

  async isValidAccessToken(accessToken: string): Promise<boolean> {
    return axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    }).then(() => true).catch(() => false);
  }
}