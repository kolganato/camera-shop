import { ProductCategory, ProductLevel, ProductType } from '../config';
import { Product } from '../types/product';
import faker from 'faker';
import { ReviewData } from '../types/review-data';
import { Promo } from '../types/promo';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../store';
import { createAPI } from '../services/api';
import { testInitialState } from '../store/products/products-slice';

export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;
export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  PRODUCTS: {
    ...testInitialState,
  },
  ...(initialState ?? {}),
});

export const makeFakeProduct = (): Product =>
  ({
    id: faker.datatype.number(),
    name: faker.commerce.productName(),
    vendorCode: faker.random.word(),
    type: ProductType.Collectible,
    category: ProductCategory.Photo,
    description: faker.lorem.words(30),
    level: ProductLevel.Amateur,
    price: Number(faker.commerce.price()),
    rating: faker.datatype.number(5),
    reviewCount: faker.datatype.number(19),
    previewImg: faker.image.technics(),
    previewImg2x: faker.image.technics(),
    previewImgWebp: faker.image.technics(),
    previewImgWebp2x: faker.image.technics(),
  } as Product);

export const makeFakeReview = (): ReviewData =>
  ({
    id: faker.random.alpha({ count: 4 }),
    createAt: String(new Date()),
    cameraId: Number(faker.datatype.number(53)),
    userName: faker.name.firstName(),
    advantage: faker.lorem.words(10),
    disadvantage: faker.lorem.words(10),
    review: faker.lorem.words(18),
    rating: faker.datatype.number(5),
  } as ReviewData);

export const makeFakeReviewNew = (): ReviewData =>
  ({
    cameraId: Number(faker.datatype.number(53)),
    userName: faker.name.firstName(),
    advantage: faker.lorem.words(10),
    disadvantage: faker.lorem.words(10),
    review: faker.lorem.words(18),
    rating: faker.datatype.number(5),
  } as ReviewData);

export const makeFakePromo = (): Promo =>
  ({
    id: faker.datatype.number(),
    name: faker.commerce.productName(),
    previewImg: faker.image.technics(),
    previewImg2x: faker.image.technics(),
    previewImgWebp: faker.image.technics(),
    previewImgWebp2x: faker.image.technics(),
  } as Promo);
