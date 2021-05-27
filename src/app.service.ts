import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import Playlist from './common/classes/playlist';
import Song from './common/classes/song';
import config from './config/config';

@Injectable()
export class AppService {
  
  async getPlaylists(accessToken: string, userId: string): Promise<Playlist[]> {
    const { data } = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    const playlists: Playlist[] = data.items.filter((item: any) => item.owner.id == userId).map((item: any) => (
      {
        image: item.images.length ? item.images[0] : null,
        name: item.name,
        id: item.id,
        url: item.external_urls.spotify
      }
    ));

    return playlists;
  }

  async getAccessToken(): Promise<string> {
    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const res = await axios.post('https://accounts.spotify.com/api/token', urlencoded, {
      headers: {
        'Authorization': `Basic ${Buffer.from(config.client_id+":"+config.client_secret).toString('base64')}`
      }
    }).catch(err => console.log(err));

    return res ? res.data.access_token : null;
  }

  async getSongs(song: string): Promise<Song[]> {
    if (!song) {
      throw new BadRequestException();
    }

    const accessToken = await this.getAccessToken();
    
    const { data } = await axios.get(`https://api.spotify.com/v1/search?q=${song}&type=track`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    
    return data.tracks.items.map((item: any) => (
      {
        href: item.external_urls.spotify,
        id: item.id,
        image: item.album.images[0],
        name: item.name,
        preview_url: item.preview_url
      }
    ));
  }

}
