export class User {
    id?: number;
    username?: string;
    email?: string;
    password?: string;

    constructor(data: Partial<User> = {}) {
        Object.assign(this, data);
    }
}