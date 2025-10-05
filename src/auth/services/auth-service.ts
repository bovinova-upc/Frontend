import http from "../../shared/services/http";
import type { User } from "../model/user";

export class AuthService {
    private endpoint = import.meta.env.VITE_API_BASE_URL + '/user';

    async register(user: User) {
        return await http.post(this.endpoint + "/sign-up", user);
    }

    async login(user: User) {
        return await http.post(this.endpoint + "/sign-in", user);
    }
}

export const authService = new AuthService();