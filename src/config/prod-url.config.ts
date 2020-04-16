const hostandPort: string = 'http://localhost:9000';

export class ProdURLConfig {
    static matchesCategories: string = `${hostandPort}/matches/categories`;
    static matchesResults: string = `${hostandPort}/matches/results`;
    static recommendedProfiles: string = `${hostandPort}/matches/recommended-profiles`;
}