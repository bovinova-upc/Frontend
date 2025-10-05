export class Campaign {
    id?: number;
    name?: string;
    date?: Date;

    constructor(data: Partial<Campaign> = {}) {
        Object.assign(this, data);

        if (data.date)
            this.date = new Date(data.date);
    }
}