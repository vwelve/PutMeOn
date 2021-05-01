import ISong from "src/common/interfaces/song.interface";
import { Post } from "src/posts/schemas/post.schema";
import { User } from "src/users/schemas/user.schema";

export class CreateSuggestionDto {
    users: User[];
    post: Post;
    song: ISong;
}