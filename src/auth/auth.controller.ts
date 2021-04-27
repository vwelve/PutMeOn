import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Payload } from './decorators/payload.decorator';
import { SpotifyAuthGuard } from './guards/spotify-auth.guard';
import IPayload from './interfaces/payload.interface';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Get('spotify')
    @UseGuards(SpotifyAuthGuard)
    async spotify(@Payload() payload: IPayload) {
        return this.authService.login(payload);
    }
}