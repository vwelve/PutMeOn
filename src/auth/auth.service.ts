import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import IPayload from './interfaces/payload.interface';
import axios from 'axios';
import config from 'src/config/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(userDto: CreateUserDto): Promise<IPayload> {
    const user = await this.usersService.findOrCreateOne(userDto);
    
    return { _id: user._id, profileHref: user.profileHref };
  }

  async login(payload: IPayload) {
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async checkAccessToken(payload: IPayload): Promise<boolean> {
    const { updatedAt, expiresIn, accessToken, refreshToken: refresh_token } = await this.usersService.findOne(payload._id);

    if (new Date().getTime() - updatedAt.getTime() > expiresIn) {
      const headers = {
        Authorization: `Basic ${Buffer.from(config.client_id + ":" + config.client_secret).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      };

      const params = new URLSearchParams({ 
        refresh_token,
        grant_type: "refresh_token"
      }).toString();

      const res = await axios.post('https://accounts.spotify.com/api/token', params, { headers }).catch(() => null);

      await this.saveChange(res, payload);

      return res ? res.data.access_token : null;
    } else {
      return axios.get('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      }).then(() => accessToken).catch(() => null);
    }
  }

  async saveChange(res: any, payload: IPayload) {
    if(res) {
      await this.usersService.updateAccessToken(payload._id, res.data.access_token);
    }
  }
}