import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from './schemas/token.schema';
import { CreateTokenDto } from './dto/create-token.dto';
import axios from 'axios';
import { User } from 'src/users/schemas/user.schema';
import config from 'src/config/config';

@Injectable()
export class TokensService {
  constructor(@InjectModel(Token.name) private TokenModel: Model<TokenDocument>) {}

  async getAccessToken(user: User): Promise<string | null> {
    const { accessToken, refreshToken: refresh_token, expiresIn, updatedAt } = await this.TokenModel.findOne({ user }).exec();

    if (new Date().getTime() - updatedAt.getTime() > expiresIn) {
      const res = await axios.get('https://accounts.spotify.com/api/token', { 
        data: {  
          refresh_token,
          grant_type: "refresh_token"
        },
        headers: {
          Authorization: `Basic ${config.client_id}:${config.client_secret}`
        }
      }).catch(() => null);

      await this.updateAccessToken(res, user, refresh_token);

      return res ? res.data.access_token : null;
    } else {
      return axios.get('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(() => accessToken).catch(() => null);
    } 
  }

  async updateAccessToken(res: any, user: User, refresh_token: string): Promise<void> {
    if (res) {
      await this.updateOrCreate(user, res.data.access_token, refresh_token);
    }
  }
  
  async updateOrCreate(user: User, accessToken: string, refreshToken: string, expiresIn: number = 3600): Promise<void> {
    this.TokenModel.findOneAndUpdate({ user }, { user, accessToken, refreshToken, expiresIn }, { upsert: true }).exec();
  }
}
