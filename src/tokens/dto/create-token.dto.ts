import { User } from "src/users/schemas/user.schema";

export class CreateTokenDto {
    readonly _id: string;
    readonly user: User;
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly expiresIn: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}