import { User } from "src/users/schemas/user.schema";

export class CreatePostDto {
    createdBy: User;
    theme: string;
    playlistId: string;
}