import { Controller, Request, Get, UseGuards, Query, Req, Res, Next, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { authenticate } from 'passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Get('spotify')
    @UseGuards(AuthGuard('spotify'))
    async spotify(@Req() req) {
        return req.user;
    }
}