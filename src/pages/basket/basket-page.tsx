import { Helmet } from 'react-helmet-async';
import BreadCrumbs from '../../components/breadcrumbs';
import { Status, TitlesPages } from '../../config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getBasket,
  getCoupon,
  getOrderData,
  getStatusOrder,
  getStatusPromocodeData,
  getTotalPrice,
} from '../../store/products/selector';
import { Product } from '../../types/product';
import {
  changeCountProductInBasket,
  decreaseProductInBasket,
  increaseProductInBasket,
  setProductToRemove,
  setStatusActiveModal,
  setStatusModalOrder,
  setStatusModalRemoveProduct,
  setStatusOrderData,
  setStatusPromocodeData,
} from '../../store/products/products-slice';
import Modal from '../../components/modal/modal';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import {
  fetchOrderAction,
  fetchPromocodeAction,
} from '../../store/api-actions';
import classNames from 'classnames';

function BasketPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const productsBasket = useAppSelector(getBasket);
  const totalPrice = useAppSelector(getTotalPrice);
  const statusPromocodeData = useAppSelector(getStatusPromocodeData);
  const orderData = useAppSelector(getOrderData);
  const statusOrder = useAppSelector(getStatusOrder);
  const coupon = useAppSelector(getCoupon);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const promocodeReg = /[\s]/;
  const [isCorrectPromocode, setIsCorrectPromocode] = useState<boolean>(true);
  const [hasCoupon, setHasCoupon] = useState<boolean>(false);

  useEffect(() => {
    if (statusPromocodeData === Status.Success) {
      setHasCoupon(true);
      dispatch(setStatusPromocodeData(Status.Idle));
    }
    if (statusPromocodeData === Status.Error) {
      setIsCorrectPromocode(false);
      setHasCoupon(false);
    }
    if(statusOrder === Status.Success){
      dispatch(setStatusActiveModal(true));
      dispatch(setStatusModalOrder(true));
      dispatch(setStatusOrderData(Status.Idle));
    }
  }, [dispatch, statusPromocodeData, statusOrder]);

  const handleRemoveProduct = (product: Product) => {
    dispatch(setProductToRemove(product));
    dispatch(setStatusModalRemoveProduct(true));
  };

  const handleClickIncrease = (id: Product['id']) => {
    dispatch(increaseProductInBasket(id));
  };

  const handleClickDecrease = (id: Product['id']) => {
    dispatch(decreaseProductInBasket(id));
  };

  const handleSubmitPromocode = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (inputRef.current !== null && isCorrectPromocode) {
      dispatch(fetchPromocodeAction(inputRef.current.value));
    }
  };

  const handleChangePromocode = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    if (inputRef.current !== null) {
      setIsCorrectPromocode(true);
      if (promocodeReg.test(inputRef.current.value)) {
        setIsCorrectPromocode(false);
      }
    }
  };

  return (
    <main data-testid="basket">
      <Helmet>
        <title>{TitlesPages.Basket}</title>
      </Helmet>
      <div className="page-content">
        <BreadCrumbs title={TitlesPages.Basket} />
        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            <ul className="basket__list">
              {productsBasket &&
                productsBasket.map((product) => (
                  <li className="basket-item" key={product.id}>
                    <div className="basket-item__img">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x} 2x`}
                        />
                        <img
                          src={product.previewImg}
                          srcSet={`${product.previewImg2x} 2x`}
                          width={140}
                          height={120}
                          alt={product.name}
                        />
                      </picture>
                    </div>
                    <div className="basket-item__description">
                      <p className="basket-item__title">{product.name}</p>
                      <ul className="basket-item__list">
                        <li className="basket-item__list-item">
                          <span className="basket-item__article">Артикул:</span>{' '}
                          <span className="basket-item__number">
                            {product.vendorCode}
                          </span>
                        </li>
                        <li className="basket-item__list-item">
                          {`${
                            product.type
                          } ${product.category.toLocaleLowerCase()}`}
                        </li>
                        <li className="basket-item__list-item">
                          {product.level}
                        </li>
                      </ul>
                    </div>
                    <p className="basket-item__price">
                      <span className="visually-hidden">Цена:</span>
                      {product.price.toLocaleString('ru-RU')} ₽
                    </p>
                    <div className="quantity">
                      <button
                        className="btn-icon btn-icon--prev"
                        aria-label="уменьшить количество товара"
                        onClick={() => void handleClickDecrease(product.id)}
                        disabled={product.count === 1}
                      >
                        <svg width={7} height={12} aria-hidden="true">
                          <use xlinkHref="#icon-arrow" />
                        </svg>
                      </button>
                      <label className="visually-hidden" htmlFor="counter1" />
                      <input
                        type="number"
                        id="counter1"
                        value={product.count}
                        onBlur={(evt) => {
                          if (
                            !evt.target.value ||
                            Number(evt.target.value) < 1
                          ) {
                            dispatch(
                              changeCountProductInBasket([product.id, 1])
                            );
                            evt.target.value = String(1);
                          }

                          if (Number(evt.target.value) > 99) {
                            dispatch(
                              changeCountProductInBasket([product.id, 99])
                            );
                            evt.target.value = String(99);
                          }
                        }}
                        onChange={(evt) => {
                          if (Number(evt.target.value) < 1) {
                            dispatch(
                              changeCountProductInBasket([product.id, 1])
                            );
                          }
                          if (Number(evt.target.value) > 99) {
                            dispatch(
                              changeCountProductInBasket([product.id, 99])
                            );
                            evt.target.value = String(99);
                          }
                          if (
                            Number(evt.target.value) >= 1 &&
                            Number(evt.target.value) <= 99
                          ) {
                            dispatch(
                              changeCountProductInBasket([
                                product.id,
                                Number(evt.target.value),
                              ])
                            );
                          }
                        }}
                        min={1}
                        max={99}
                        aria-label="количество товара"
                      />
                      <button
                        className="btn-icon btn-icon--next"
                        aria-label="увеличить количество товара"
                        onClick={() => void handleClickIncrease(product.id)}
                        disabled={product.count === 99}
                      >
                        <svg width={7} height={12} aria-hidden="true">
                          <use xlinkHref="#icon-arrow" />
                        </svg>
                      </button>
                    </div>
                    <div className="basket-item__total-price">
                      <span className="visually-hidden">Общая цена:</span>
                      {(product.count * product.price).toLocaleString('ru-RU')}₽
                    </div>
                    <button
                      className="cross-btn"
                      type="button"
                      aria-label="Удалить товар"
                      onClick={() => void handleRemoveProduct(product)}
                      onFocus={(evt) => {
                        evt.target.blur();
                      }}
                    >
                      <svg width={10} height={10} aria-hidden="true">
                        <use xlinkHref="#icon-close" />
                      </svg>
                    </button>
                  </li>
                ))}
            </ul>
            <div className="basket__summary">
              <div className="basket__promo">
                <p className="title title--h4">
                  Если у вас есть промокод на скидку, примените его в этом поле
                </p>
                <div className="basket-form">
                  <form action="#">
                    <div
                      className={classNames('custom-input', {
                        'is-invalid': !isCorrectPromocode,
                        'is-valid': hasCoupon,
                      })}
                    >
                      <label>
                        <span className="custom-input__label">Промокод</span>
                        <input
                          type="text"
                          name="promo"
                          placeholder="Введите промокод"
                          ref={inputRef}
                          onChange={(evt) => handleChangePromocode(evt)}
                          onKeyDown={(evt) => {
                            if(evt.code === 'Space' && inputRef.current !== null){
                              evt.preventDefault();
                            }
                          }}
                          onPaste={(evt) => {
                            if(evt.clipboardData.getData('text').search(' ') >= 0){
                              evt.preventDefault();
                            }
                          }}
                        />
                      </label>
                      <p className="custom-input__error">Промокод неверный</p>
                      <p className="custom-input__success">Промокод принят!</p>
                    </div>
                    <button
                      className="btn"
                      type="submit"
                      onClick={(evt) => handleSubmitPromocode(evt)}
                    >
                      Применить
                    </button>
                  </form>
                </div>
              </div>
              <div className="basket__summary-order">
                <p className="basket__summary-item">
                  <span className="basket__summary-text">Всего:</span>
                  <span className="basket__summary-value">
                    {totalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                </p>
                <p className="basket__summary-item">
                  <span className="basket__summary-text">Скидка:</span>
                  <span className="basket__summary-value basket__summary-value--bonus">
                    {(coupon
                      ? (totalPrice / 100) * coupon.sales
                      : 0
                    ).toLocaleString('ru-RU')}{' '}
                    ₽
                  </span>
                </p>
                <p className="basket__summary-item">
                  <span className="basket__summary-text basket__summary-text--total">
                    К оплате:
                  </span>
                  <span className="basket__summary-value basket__summary-value--total">
                    {(coupon
                      ? totalPrice - (totalPrice / 100) * coupon.sales
                      : totalPrice
                    ).toLocaleString('ru-RU')}{' '}
                    ₽
                  </span>
                </p>
                <button
                  className="btn btn--purple"
                  type="submit"
                  disabled={productsBasket.length === 0}
                  onClick={(evt) => {
                    evt.preventDefault();

                    dispatch(
                      fetchOrderAction({
                        camerasIds: orderData,
                        coupon: coupon ? coupon.coupon : null,
                      })
                    );
                  }}
                >
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Modal />
    </main>
  );
}

export default BasketPage;
