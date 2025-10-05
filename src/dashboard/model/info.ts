import { Campaign } from "./campaign";

export class Info {
    id?: number;
    name?: string;
    totalAnimals?: number;
    totalStables?: number;
    totalCampaigns?: number;
    totalStaff?: number;
    totalProducts?: number;
    nextCampaigns?: Campaign[];

    constructor(data: Partial<Info> = {}) {
        Object.assign(this, data);

        if (data.nextCampaigns)
            this.nextCampaigns = data.nextCampaigns.map(c => new Campaign(c));
    }
}