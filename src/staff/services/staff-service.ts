import http from "../../shared/services/http";
import type { Staff } from "../model/staff";

export class StaffService {
    private endpoint = import.meta.env.VITE_API_BASE_URL + '/staff';

    async getStaff() {
        return await http.get<Staff[]>(this.endpoint);
    }

    async addStaff(staff: Staff) {
        const data = {
            ...staff,
            employeeStatus: staff.status
        };
        return await http.post(this.endpoint, data);
    }

    async deleteStaff(staff: Staff) {
        return await http.delete(`${this.endpoint}/${staff.id}`);
    }

    async updateStaff(staff: Staff) {
        const data = {
            ...staff,
            employeeStatus: staff.status
        };
        return await http.put(`${this.endpoint}/${staff.id}`, data);
    }
}

export const staffService = new StaffService();