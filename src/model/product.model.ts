export interface Customer {
    id?        : number;
    usersId?   : number;
    type?      : string;
    title?     : string;
    method?    : string;
    inventory? : number;
    price?     : number;
}

export interface CustomerCreate {
    id?        : number;
    usersId?   : number;
    type?      : string;
    title?     : string;
    method?    : string;
    inventory? : number;
    price?     : number;
}
