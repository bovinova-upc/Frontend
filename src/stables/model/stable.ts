export class Stable {
    id?: number;
    name?: string;
    limit?: number;

    constructor(data: Partial<Stable> = {}) {
        Object.assign(this, data);
    }
}