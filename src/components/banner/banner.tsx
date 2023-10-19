import { useAppSelector } from '../../hooks';
import { getPromoProducts } from '../../store/products/selector';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../config';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

function Banner(): JSX.Element {
  const promoProducts = useAppSelector(getPromoProducts);

  return (
    <Swiper
      autoplay={{ disableOnInteraction: true }}
      slidesPerView={1}
      spaceBetween={0}
      modules={[Autoplay]}
    >
      {promoProducts &&
        promoProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="banner">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x} 2x`}
                />
                <img
                  src={product.previewImg}
                  srcSet={`${product.previewImg2x} 2x`}
                  width={1280}
                  height={280}
                  alt="баннер"
                />
              </picture>
              <p className="banner__info">
                <span className="banner__message">Новинка!</span>
                <span className="title title--h1">{product.name}</span>
                <span className="banner__text">
                  Профессиональная камера от&nbsp;известного производителя
                </span>
                <Link className="btn" to={`${AppRoute.Catalog}/${product.id}`}>
                  Подробнее
                </Link>
              </p>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export default Banner;
