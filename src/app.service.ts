import { Injectable } from '@nestjs/common';
import axios from 'axios';
import Playlist from './common/classes/playlist';

@Injectable()
export class AppService {

  async getPlaylists(accessToken: string, userId: string): Promise<Playlist[]> {
    const { data } = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    console.log(userId);
    console.log(data.items[0]);

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

}
