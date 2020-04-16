import { Options } from 'ng5-slider';
import { MatchesCategoriesTypes } from '../constants/matches-categories-types.enum';

export class MatchesCategories {
    id: string;
    name: string;
    type: MatchesCategoriesTypes;
    options: CategoryOptions[] | Options;
    minValue?: number;
    maxValue?: number;
    isRangeStart?: boolean;
}

export class CategoryOptions {
    id: string;
    name: string;
    parent: string;
    divisionId?: string;
    divisionName?: string;
    count?: number;
    checked?: boolean;
}