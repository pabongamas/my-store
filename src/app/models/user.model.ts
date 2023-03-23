export interface User{
    id:string;
    name:string
    email:string;
    password:string;
}

export interface CreateUsertDTO extends Omit<User,'id'>{}
    