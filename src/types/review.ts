import { ReviewData } from './review-data';

export type Review = Omit<ReviewData, 'id' | 'createAt'>;
