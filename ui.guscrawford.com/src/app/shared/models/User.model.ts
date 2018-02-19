export interface User {
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