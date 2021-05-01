import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessTokensService } from './access-tokens.service';
import { AccessToken, AccessTokenDocument, AccessTokensSchema } from './schemas/access-token.schema';
import crypto from 'crypto-js';
import { cryptoConstants } from 'src/config/constants';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { 
        name: AccessToken.name,
        useFactory: () => {
          const schema = AccessTokensSchema;
          schema.pre<AccessTokenDocument>('save', async function () {            
            if (this.isModified('accessToken')) {
              this.accessToken = crypto.AES.encrypt(this.accessToken, cryptoConstants.secret).toString();
            }

            if (this.isModified('refreshToken')) {
              this.refreshToken = crypto.AES.encrypt(this.refreshToken, cryptoConstants.secret).toString();
            }
          });

          schema.pre<AccessTokenDocument>(/^find/, { document: true }, async function () {
            this.accessToken = crypto.AES.decrypt(this.accessToken, cryptoConstants.secret).toString(crypto.enc.Utf8);
            this.refreshToken = crypto.AES.decrypt(this.refreshToken, cryptoConstants.secret).toString(crypto.enc.Utf8);
          });

          return schema;
        }
      }
    ])
  ],
  providers: [AccessTokensService]
})
export class AccessTokensModule {}
