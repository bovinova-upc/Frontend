export class Campaign {
    id?: number;
    name?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    isActive?: boolean;

    constructor(data: Partial<Campaign> = {}) {
        Object.assign(this, data);

        if (data.startDate)
            this.startDate = new Date(data.startDate);

        if (data.endDate)
            this.endDate = new Date(data.endDate);

        if (this.startDate && this.endDate) {
            const now = new Date();
            this.isActive = this.startDate <= now && now <= this.endDate;
        }
    }
}