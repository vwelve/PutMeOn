import ISong from "src/common/interfaces/song.interface";
import { User } from "src/users/schemas/user.schema";

export class CreateQueueDto {
    user: User;
    song: ISong;
}