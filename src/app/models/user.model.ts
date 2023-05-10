export interface User{
    id:string;
    name:string
    email:string;
    password:string;
    role:'customer'|'admin';
}

export interface CreateUsertDTO extends Omit<User,'id'>{}
    