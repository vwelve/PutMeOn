export class CreateUserDto {
    readonly _id: string;
    readonly display_name: string;
    readonly external_urls: { spotify: string; };
    readonly images: { 
        height: null | number;
        url: string;
        width: null | number;
    }[];
}