export interface Customer {
    id?: number;
    usersId?: number;
    name?: string;
    customerId?: number;
}

export interface CustomerCreate {
    usersId?: number;
    name: string;
    customerId?: number;
}
