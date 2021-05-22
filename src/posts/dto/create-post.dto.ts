import Playlist from "src/common/classes/playlist";

export class CreatePostDto {
    author: string;
    playlist: Playlist;
    theme: string;
}