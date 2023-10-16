import { useAppDispatch, useAppSelector } from '../../hooks';
import { setProductToAdd } from '../../store/products/products-slice';
import { getBasket } from '../../store/products/selector';
import { Product } from '../../types/product';
import ProductCard from '../product-card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import { useRef } from 'react';

type SimilarProductsProps = {
  products: Product[];
};

function SimilarProducts({ products }: SimilarProductsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(getBasket);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const swiperRef = useRef<SwiperCore>();

  const handleClick = (product: Product) => {
    dispatch(setProductToAdd(product));
  };

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              slidesPerView={3}
              modules={[Navigation]}
              spaceBetween={32}
              slidesPerGroup={3}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
            >
              <div className="product-similar__slider-list">
                {products.map((product) => (
                  <SwiperSlide key={product.id}>
                    <ProductCard
                      product={product}
                      inBasket={basket.includes(product.id)}
                      onClick={handleClick}
                      isSimilar
                    />
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
            <button
              ref={navigationPrevRef}
              onClick={() => swiperRef.current?.slidePrev()}
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              disabled={false}
              style={{
                zIndex: 2,
              }}
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
            <button
              ref={navigationNextRef}
              onClick={() => swiperRef.current?.slideNext()}
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
              style={{
                zIndex: 2,
              }}
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SimilarProducts;
