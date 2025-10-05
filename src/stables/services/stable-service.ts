import http from "../../shared/services/http";
import type { Stable } from "../model/stable";

export class StableService {
    private endpoint = import.meta.env.VITE_API_BASE_URL + '/stables';

    async getStables() {
        return await http.get<Stable[]>(this.endpoint);
    }

    async addStable(stable: Stable) {
        return await http.post<Stable>(this.endpoint, stable);
    }

    async deleteStable(stable: Stable) {
        return await http.delete(`${this.endpoint}/${stable.id}`);
    }

    async updateStable(stable: Stable) {
        return await http.put<Stable>(`${this.endpoint}/${stable.id}`, stable);
    }
}

export const stableService = new StableService();