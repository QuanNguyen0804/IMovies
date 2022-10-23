export interface Film {
    modified: {
        time: string;
    };
    _id: string;
    name: string;
    origin_name: string;
    poster_url: symbol;
    thumb_url: string;
    slug: string;
    year: number;
}

export interface Films {
    status: boolean;
    items: [Film];
    pagination: {
        totalItems: number;
        totalItemsPerPage: number;
        currentPage: number;
        totalPages: number;
    };
}

export interface FilmDetails {
actor: any;
category: any;
chieurap: boolean;
content: string;
country: any;
director: [string];
episode_current: string;
episode_total: string;
is_copyright: boolean;
lang: string;
modified: {time: string;}
name: string;
notify: string;
origin_name: string;
poster_url: string;
quality: string;
// showtimes: string;
slug: string;
status: string;
sub_docquyen: string;
thumb_url: string;
time: string;
trailer_url: string;
type: string;
year: number
_id: string;
}

interface Server_data{
    filename: string;
    link_embed: string;
    link_m3u8: string
    // name
    // slug
}

export interface Episodes {
    server_data: [Server_data]
    server_name: string;
}