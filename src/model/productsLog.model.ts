export interface ProductsLog {
    id?:          number;
    productsId?:  number;
    quantity?:    number;
    price?:       number;
    usersId?:     number;
    customersId?: number;
    returningAt?: string;
    returnedAt?:  string;
}

export interface ProductsLogCreate {
    id?:          number;
    productsId?:  number;
    quantity?:    number;
    price?:       number;
    usersId?:     number;
    customersId?: number;
    returningAt?: string;
    returnedAt?:  string;
}
