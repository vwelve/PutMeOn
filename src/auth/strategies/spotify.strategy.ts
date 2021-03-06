import { Strategy } from 'passport-spotify';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import config from 'src/config/config';
import { AuthService } from '../auth.service';
import { v4 } from 'uuid';
import Payload from '../../common/classes/payload';

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

  async validate(accessToken: string, _, profile: any): Promise<Payload> {
    const { id: userId, photos,  profileUrl, displayName } = profile;
    const userDto = {
      provider: "spotify",
      userId,
      displayName,
      image: photos.length ? photos[0].value : null,
      profileUrl
    };

    const { _id } = await this.authService.updateOrCreate(userDto);
    
    return { accessToken, id: _id.toString(), userId };
  }
}