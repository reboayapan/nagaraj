const hostandPort: string = 'http://localhost:3000';

export class DevURLConfig {
    static matchesCategories: string = `${hostandPort}/matches/categories`;
    static matchesResults: string = `${hostandPort}/matches/results`;
    static recommendedProfiles: string = `${hostandPort}/matches/recommended-profiles`;
}