export interface ProductsLog {
    id?:             number;
    productsId?:     number;
    quantity?:       number;
    price?:          number;
    usersId?:        number;
    customersId?:    number;
    returningAt?:    Date|null;
    returnedAt?:     string;
}

export interface ProductsLogCreate {
    id?:          number;
    productsId:   number;
    quantity:     number;
    price:        number;
    usersId?:     number;
    customersId?: number;
    returningAt?: Date|null;
    returnedAt?:  string;
}

export interface ProductsFilters {
    method?:        string;
    pendingReturn?: string;
    startAt?:       string;
    endAt?:         string;
}