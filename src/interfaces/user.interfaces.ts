
export interface IUser {
    _id:       string;
    name:      string;
    email:     string;
    password:  string;
    img:       string;
    role:      IRole;
    state:     boolean;
    google:    boolean;
}

export enum IRole {
    Admin = 'ADMIN_ROLE', 
    Shop  = 'SHOP_ROLE',
    User  = 'USER_ROLE',
}
