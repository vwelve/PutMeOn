import { BadRequestException, Body, Controller, Get, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { GetPayload } from "./common/decorators/payload.decorator";
import Payload from "./common/classes/payload";

@Controller()
export class AppController {
    
    constructor(private appService: AppService) {}

    @Get("playlists")
    @UseGuards(JwtAuthGuard)
    async getPlaylists(@GetPayload() payload: Payload) {
        return this.appService.getPlaylists(payload.accessToken, payload.userId);
    }

    @Get("songs")
    async getSongs(@Body('song') song: string) {
        return this.appService.getSongs(song);
    }

}