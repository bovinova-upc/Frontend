import http from "../../shared/services/http";

export class DashboardService {
    private endpoint = import.meta.env.VITE_API_BASE_URL + '/user';

    async getData() {
        return await http.get(this.endpoint + "/profile");
    }

}

export const dashboardService = new DashboardService();