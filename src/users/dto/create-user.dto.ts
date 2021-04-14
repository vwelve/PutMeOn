export class CreateUserDto {
    readonly display_name: string;
    readonly external_urls: { spotify: string; };
    readonly href: string;
    readonly id: string;
    readonly images: { 
        height: null | number;
        url: string;
        width: null | number;
    }[];
    readonly type: string;
    readonly uri: string;
}