import { AppRoute } from '../../config';
import { Product } from '../../types/product';
import { Link } from 'react-router-dom';
import Rating from '../rating';
import classNames from 'classnames';

type ProductCardProps = {
  product: Product;
  inBasket: boolean;
  onClick: (product: Product) => void;
  isSimilar?: boolean;
};

function ProductCard({
  product,
  inBasket,
  onClick,
  isSimilar,
}: ProductCardProps): JSX.Element {
  const {
    id,
    name,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    price,
    rating,
    reviewCount,
  } = product;

  const handleClick = () => {
    onClick(product);
  };

  return (
    <div
      className={classNames('product-card', {
        'is-active': isSimilar,
      })}
      style={{
        width: '100%'
      }}
    >
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg2x} 2x`}
            width={280}
            height={240}
            alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <Rating rating={rating} />
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>
            {reviewCount}
          </p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {price.toLocaleString('ru-RU')} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {!inBasket && (
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={handleClick}
          >
            Купить
          </button>
        )}
        {inBasket && (
          <a
            className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
            href="#"
          >
            <svg width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-basket" />
            </svg>
            В корзине
          </a>
        )}
        <Link className="btn btn--transparent" to={`${AppRoute.Catalog}/${id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
