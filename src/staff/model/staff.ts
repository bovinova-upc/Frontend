export class Staff {
    id?: number;
    name?: string;
    status?: StaffStatus;

    constructor(data: Partial<Staff> = {}) {
        if (data)
            Object.assign(this, data);
    }
}

export enum StaffStatus {
    Activo = 1,
    Inactivo
}