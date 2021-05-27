import Song from "src/common/classes/song";

export class CreateSuggestionDto {
    post: string;
    suggestors: string[];
    song: Song; 
}