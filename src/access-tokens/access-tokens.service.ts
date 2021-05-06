import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AccessTokensService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async get(userId: string): Promise<string> {
        return await this.cacheManager.get(userId); 
    }

    async set(userId: string, refreshToken: string): Promise<void> {
        await this.cacheManager.set(userId, refreshToken);
    }
    
    async del(userId: string) {
        await this.cacheManager.del(userId);
    }
}
