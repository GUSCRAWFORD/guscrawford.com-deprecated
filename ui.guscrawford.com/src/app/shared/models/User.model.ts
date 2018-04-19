import { Any } from './Any.model';
export interface User extends Any {
    username: string;
    password?: string;
    roles?: UserRoles[];
    _id?: string;
}
export enum UserRoles {
    Guest,
    Member,
    Admin
}