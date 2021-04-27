export class CreateUserDto {
    readonly userId: string;
    readonly profileHref: string;
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly expiresIn?: number;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}