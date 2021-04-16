import { Strategy } from 'passport-spotify';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import config from 'src/config/config';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from './auth.service';
import { v4 } from 'uuid';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {
  constructor(private authService: AuthService) {
    super({
      authorizationURL: 'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + config.client_id +
      (config.scopes ? '&scope=' + encodeURIComponent(config.scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(config.callback_url),
      clientID: config.client_id,
      callbackURL: config.callback_url,
      clientSecret: config.client_secret,
      state: v4()
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: any): Promise<User> {
    const { id: _id, display_name, images, external_urls  } = profile["_json"];
    return this.authService.validateUser({ _id, display_name, images, external_urls });
  }
}