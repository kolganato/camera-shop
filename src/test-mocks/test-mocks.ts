import { ProductCategory, ProductLevel, ProductType } from '../config';
import { Product } from '../types/product';
import faker from 'faker';
import { ReviewData } from '../types/review-data';
import { Promo } from '../types/promo';

export const makeFakeProduct = (): Product =>
  ({
    id: Number(faker.random.alphaNumeric(53)),
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
    id: Number(faker.random.alphaNumeric(3)),
    name: faker.commerce.productName(),
    previewImg: faker.image.technics(),
    previewImg2x: faker.image.technics(),
    previewImgWebp: faker.image.technics(),
    previewImgWebp2x: faker.image.technics(),
  } as Promo);
