import { User } from "src/users/schemas/user.schema";

export class CreateAccessTokenDto {
    accessToken: string;
    refreshToken: string;
    expiresIn?: number;
    user: User;
}