import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SpotifyAuthGuard } from './guards/spotify-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Get('spotify')
    @UseGuards(SpotifyAuthGuard)
    async spotify(@Req() req) {
        return this.authService.login(req.user);
    }
    
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async profile(@Req() req) {
        return req.user;
    }
}