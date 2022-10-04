export interface Product {
    id?        : number;
    usersId?   : number;
    type?      : string;
    title?     : string;
    method?    : string;
    inventory? : number;
    price?     : number;
    productId? : number;
    productsId? : number;
}

export interface ProductCreate {
    usersId    : number;
    type       : string;
    title      : string;
    method     : string;
    inventory  : number;
    price      : number;
    productId? : number;
}
