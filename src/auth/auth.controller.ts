import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetPayload } from '../common/decorators/payload.decorator';
import { SpotifyAuthGuard } from './guards/spotify-auth.guard';
import Payload from '../common/classes/payload';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Get('spotify')
    @UseGuards(SpotifyAuthGuard)
    async spotify(@GetPayload() payload: Payload) {
        return this.authService.login(payload);
    }
}