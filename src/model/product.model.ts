export interface Product {
    id?        : number;
    usersId?   : number;
    type?      : string;
    title?     : string;
    method?    : string;
    inventory? : number;
    price?     : number;
}

export interface ProductCreate {
    id?        : number;
    usersId?   : number;
    type?      : string;
    title?     : string;
    method?    : string;
    inventory? : number;
    price?     : number;
}
