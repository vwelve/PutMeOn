import { CacheModule, Module } from '@nestjs/common';
import { AccessTokensService } from './access-tokens.service';
import * as redisStore from 'cache-manager-redis-store';
import config from 'src/config/config';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: config.redis_host,
      port: config.redis_port,
    })
  ],
  providers: [AccessTokensService],
  exports: [AccessTokensService]
})
export class AccessTokensModule {}
