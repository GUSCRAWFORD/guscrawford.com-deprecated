export interface User {
    username: string;
    roles: UserRoles[];
    _id?: string;
}
export enum UserRoles {
    Guest,
    Member
}