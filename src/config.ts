export enum AppRoute {
  Root = '/',
  Product = '/cameras',
  Basket = '/basket',
  NotFound = '*',
}

export enum APIRoute {
  Products = '/cameras',
  SimilarProducts = '/similar',
  Promo = '/promo',
  Reviews = '/reviews',
  Coupons = '/coupons',
  Orders = '/orders',
}

export enum NameSpace {
  Products = 'PRODUCTS',
}

export enum ProductType {
  Collectible = 'Коллекционная',
  Instant = 'Моментальная',
  Digital = 'Цифровая',
  Film = 'Плёночная',
}

export enum ProductCategory {
  Video = 'Видеокамера',
  Photo = 'Фотоаппарат',
}

export enum ProductLevel {
  Zero = 'Нулевой',
  Amateur = 'Любительский',
  Pro = 'Профессиональный',
}

export enum Coupon {
  Camera333 = 'camera-333',
  Camera444 = 'camera-444',
  Camera555 = 'camera-555',
}

export const COUPONS = ['camera-333', 'camera-444', 'camera-555'];

export enum SortMethod {
  Price = 'sortPrice',
  Popular = 'sortPopular',
}

export enum SortPriority {
  Up = 'up',
  Down = 'down',
}

export enum Tab {
  Characteristics = 'characteristics',
  Description = 'description',
}
