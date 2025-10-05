export class Animal {
    id: number = 0;
    name: string = '';
    gender: string = '';
    birthDate: string = '';
    breed: string = '';
    bovineImg?: File | string;
    stableId: number = 0;

    constructor(data: Partial<Animal> = {}) {
        Object.assign(this, data);
    }
}