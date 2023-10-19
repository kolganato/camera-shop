import { useParams, useSearchParams } from 'react-router-dom';
import BreadCrumbs from '../../components/breadcrumbs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getProducts,
  getSimilarProducts,
  getStatusReviewsLoading,
  getStatusSimilarProductsLoading,
} from '../../store/products/selector';
import { useEffect, useState } from 'react';
import { redirectToRoute } from '../../store/actions';
import { AppRoute, Tab } from '../../config';
import Spinner from '../../components/spinner';
import Rating from '../../components/rating';
import { Helmet } from 'react-helmet-async';
import { getReviewsAction, getSimilarProductsAction } from '../../store/api-actions';
import SimilarProducts from '../../components/similar-products';
import Modal from '../../components/modal/modal';
import Reviews from '../../components/reviews';
import classNames from 'classnames';
import { getTab } from '../../utils/common';

function ProductPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const product = useAppSelector(getProducts).find(
    (item) => item.id === Number(id)
  );
  const similarProducts = useAppSelector(getSimilarProducts).filter((item) => item.id !== Number(id));
  const isSimilarProductsLoading = useAppSelector(getStatusSimilarProductsLoading);
  const isReviewsLoading = useAppSelector(getStatusReviewsLoading);

  const [tab, setTub] = useState<Tab | string>(getTab(searchParams.get('tab')));

  useEffect(() => {
    if (!product) {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }

    if (!isSimilarProductsLoading) {
      dispatch(getSimilarProductsAction(Number(id)));
    }

    if (!isReviewsLoading) {
      dispatch(getReviewsAction(Number(id)));
    }
  }, [dispatch, product, isSimilarProductsLoading, isReviewsLoading, id]);

  if (!product) {
    return <Spinner />;
  }

  const {
    category,
    description,
    level,
    name,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    price,
    rating,
    reviewCount,
    type,
    vendorCode,
  } = product;

  const handleClickTab = (value: Tab): void => {
    setTub(value);
  };

  return (
    <main>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <div className="page-content">
        <BreadCrumbs />
        <div className="page-content__section">
          <section className="product">
            <div className="container">
              <div className="product__img">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
                  />
                  <img
                    src={previewImg}
                    srcSet={previewImg2x}
                    width={560}
                    height={480}
                    alt={name}
                  />
                </picture>
              </div>
              <div className="product__content">
                <h1 className="title title--h3">{name}</h1>
                <div className="rate product__rate">
                  <Rating rating={rating} />
                  <p className="visually-hidden">Рейтинг: {rating}</p>
                  <p className="rate__count">
                    <span className="visually-hidden">Всего оценок:</span>
                    {reviewCount}
                  </p>
                </div>
                <p className="product__price">
                  <span className="visually-hidden">Цена:</span>
                  {price.toLocaleString('ru-RU')} ₽
                </p>
                <button className="btn btn--purple" type="button">
                  <svg width={24} height={16} aria-hidden="true">
                    <use xlinkHref="#icon-add-basket" />
                  </svg>
                  Добавить в корзину
                </button>
                <div className="tabs product__tabs">
                  <div className="tabs__controls product__tabs-controls">
                    <button
                      className={classNames('tabs__control', {
                        'is-active': tab === Tab.Characteristics,
                      })}
                      type="button"
                      onClick={() => handleClickTab(Tab.Characteristics)}
                    >
                      Характеристики
                    </button>
                    <button
                      className={classNames('tabs__control', {
                        'is-active': tab === Tab.Description,
                      })}
                      type="button"
                      onClick={() => handleClickTab(Tab.Description)}
                    >
                      Описание
                    </button>
                  </div>
                  <div className="tabs__content">
                    <div
                      className={classNames('tabs__element', {
                        'is-active': tab === Tab.Characteristics,
                      })}
                    >
                      <ul className="product__tabs-list">
                        <li className="item-list">
                          <span className="item-list__title">Артикул:</span>
                          <p className="item-list__text">{vendorCode}</p>
                        </li>
                        <li className="item-list">
                          <span className="item-list__title">Категория:</span>
                          <p className="item-list__text">{category}</p>
                        </li>
                        <li className="item-list">
                          <span className="item-list__title">Тип камеры:</span>
                          <p className="item-list__text">{type}</p>
                        </li>
                        <li className="item-list">
                          <span className="item-list__title">Уровень:</span>
                          <p className="item-list__text">{level}</p>
                        </li>
                      </ul>
                    </div>
                    <div
                      className={classNames('tabs__element', {
                        'is-active': tab === Tab.Description,
                      })}
                    >
                      <div className="product__tabs-text">{description}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {similarProducts && <SimilarProducts products={similarProducts} />}
        {isReviewsLoading && <Reviews />}
      </div>
      <Modal id={product.id} />
    </main>
  );
}

export default ProductPage;
