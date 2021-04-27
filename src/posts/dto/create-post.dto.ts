import { User } from "src/users/schemas/user.schema";

export class CreatePostDto {
    user: User;
    theme: string;
    playlistId: string;
}