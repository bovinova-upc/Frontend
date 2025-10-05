export class Category {
    id: number = 0;
    name: string = '';

    constructor(data: Partial<Category> = {}) {
        Object.assign(this, data);
    }
}