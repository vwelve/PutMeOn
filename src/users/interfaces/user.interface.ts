export default interface User {
    display_name: string,
    external_urls:{
        spotify: string
    },
    href: string,
    id: string,
    images:[{
        height: null | number,
        url: string,
        width: null | number
    }]
    type: string,
    uri: string
}