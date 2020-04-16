export class Pagination {
    currentPage: number = 0;
    alternative: number = 3;

    constructor(obj: Partial<Pagination> = {}) {
        Object.assign(this, obj);
    }
}