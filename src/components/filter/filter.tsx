import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useRef, useState } from 'react';
import { ProductCategory, ProductLevel, ProductType } from '../../config';
import { setFilter } from '../../store/products/products-slice';
import {
  getFilter,
  getMinMaxPriceProducts,
} from '../../store/products/selector';
import { createFilterData, makeArrayByChecked } from '../../utils/common';
import { useSearchParams } from 'react-router-dom';

function Filter(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const filterData = useAppSelector(getFilter);
  const [minPriceProducts, maxPriceProducts] = useAppSelector(
    getMinMaxPriceProducts
  );
  const typesBySearchParams = searchParams.get('types')?.split(',');
  const levelsBySearchParams = searchParams.get('levels')?.split(',');

  const formRef = useRef<HTMLFormElement | null>(null);

  const priceMinRef = useRef<HTMLInputElement | null>(null);
  const priceMaxRef = useRef<HTMLInputElement | null>(null);
  const photocameraRef = useRef<HTMLInputElement | null>(null);
  const videocameraRef = useRef<HTMLInputElement | null>(null);

  const levelZeroRef = useRef<HTMLInputElement | null>(null);
  const levelAmateurRef = useRef<HTMLInputElement | null>(null);
  const levelProRef = useRef<HTMLInputElement | null>(null);

  const typeDigitalRef = useRef<HTMLInputElement | null>(null);
  const typeFilmRef = useRef<HTMLInputElement | null>(null);
  const typeCollectebleRef = useRef<HTMLInputElement | null>(null);
  const typeInstantRef = useRef<HTMLInputElement | null>(null);

  const [minPrice, setMinPrice] = useState<number>(0);

  useEffect(() => {
    dispatch(setFilter(createFilterData(searchParams)));
    if (searchParams.get('price_gte')) {
      setMinPrice(Number(searchParams.get('price_gte')));
    }
  }, [dispatch, searchParams]);

  const handleChange = () => {
    searchParams.delete('category');
    searchParams.delete('levels');
    searchParams.delete('types');
    searchParams.delete('page');

    if (photocameraRef.current?.checked) {
      searchParams.set('category', photocameraRef.current.value);
    }

    if (videocameraRef.current?.checked) {
      searchParams.set('category', videocameraRef.current.value);

      if (typeFilmRef.current !== null && typeInstantRef.current !== null) {
        typeFilmRef.current.checked = false;
        typeInstantRef.current.checked = false;
      }
    }

    const types = makeArrayByChecked([
      typeCollectebleRef,
      typeDigitalRef,
      typeFilmRef,
      typeInstantRef,
    ]);

    const levels = makeArrayByChecked([
      levelAmateurRef,
      levelProRef,
      levelZeroRef,
    ]);

    if (types.length > 0) {
      searchParams.set('types', types.join(','));
    }

    if (levels.length > 0) {
      searchParams.set('levels', levels.join(','));
    }

    setSearchParams(searchParams);
  };

  const handlePriceChange = () => {
    searchParams.delete('price_gte');
    searchParams.delete('price_lte');

    if (priceMinRef.current?.value) {
      searchParams.set('price_gte', priceMinRef.current.value);
    }

    if (priceMaxRef.current?.value) {
      searchParams.set('price_lte', priceMaxRef.current.value);
    }

    const timerId = setTimeout(() => {
      if (
        minPriceProducts &&
        priceMinRef.current?.value &&
        minPriceProducts > Number(priceMinRef.current.value)
      ) {
        priceMinRef.current.value = String(minPriceProducts);
        searchParams.set('price_gte', String(minPriceProducts));
      }

      if (
        maxPriceProducts &&
        priceMaxRef.current?.value &&
        maxPriceProducts < Number(priceMaxRef.current.value)
      ) {
        priceMaxRef.current.value = String(maxPriceProducts);
        searchParams.set('price_lte', String(maxPriceProducts));
      }

      if(priceMaxRef.current?.value && priceMinRef.current?.value && Number(priceMaxRef.current.value) < Number(priceMinRef.current.value)){
        priceMaxRef.current.value = priceMinRef.current.value;
        searchParams.set('price_lte', priceMinRef.current.value);
      }

      if (priceMinRef.current?.value) {
        setMinPrice(Number(priceMinRef.current.value));
      }

      if (
        priceMaxRef.current?.value &&
        Number(priceMaxRef.current.value) < minPrice
      ) {
        priceMaxRef.current.min = String(minPrice);
        searchParams.set('price_lte', String(minPrice));
      }

      setSearchParams(searchParams);
      clearTimeout(timerId);
    }, 1000);
  };

  return (
    <div className="catalog-filter" data-testid="filter">
      <form
        action="#"
        ref={formRef}
        onReset={() => {
          if (formRef.current !== null) {
            formRef.current.reset();
            searchParams.delete('category');
            searchParams.delete('levels');
            searchParams.delete('types');
            searchParams.delete('price_gte');
            searchParams.delete('price_lte');
            searchParams.delete('page');
            setSearchParams(searchParams);
          }
        }}
      >
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                {searchParams.get('price_gte') && (
                  <input
                    type="number"
                    placeholder={String(minPriceProducts)}
                    name="priceMin"
                    ref={priceMinRef}
                    min={minPriceProducts}
                    defaultValue={Number(searchParams.get('price_gte'))}
                    onChange={handlePriceChange}
                  />
                )}
                {!searchParams.get('price_gte') && (
                  <input
                    type="number"
                    placeholder={String(minPriceProducts)}
                    name="priceMin"
                    ref={priceMinRef}
                    min={minPriceProducts}
                    onChange={handlePriceChange}
                  />
                )}
              </label>
            </div>
            <div className="custom-input">
              <label>
                {searchParams.get('price_lte') && (
                  <input
                    type="number"
                    placeholder={String(maxPriceProducts)}
                    name="priceMax"
                    ref={priceMaxRef}
                    min={minPrice}
                    max={maxPriceProducts}
                    defaultValue={Number(searchParams.get('price_lte'))}
                    onChange={handlePriceChange}
                  />
                )}
                {!searchParams.get('price_lte') && (
                  <input
                    type="number"
                    placeholder={String(maxPriceProducts)}
                    name="priceMax"
                    ref={priceMaxRef}
                    min={minPrice}
                    max={maxPriceProducts}
                    onChange={handlePriceChange}
                  />
                )}
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              {searchParams.get('category') === ProductCategory.Photo && (
                <input
                  type="checkbox"
                  name="category"
                  ref={photocameraRef}
                  value={ProductCategory.Photo}
                  disabled={filterData.category === ProductCategory.Video}
                  defaultChecked
                  onChange={handleChange}
                />
              )}
              {searchParams.get('category') !== ProductCategory.Photo && (
                <input
                  type="checkbox"
                  name="category"
                  ref={photocameraRef}
                  value={ProductCategory.Photo}
                  disabled={filterData.category === ProductCategory.Video}
                  onChange={handleChange}
                />
              )}
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              {searchParams.get('category') === ProductCategory.Video && (
                <input
                  type="checkbox"
                  name="category"
                  ref={videocameraRef}
                  value={ProductCategory.Video}
                  disabled={filterData.category === ProductCategory.Photo}
                  defaultChecked
                  onChange={handleChange}
                />
              )}
              {searchParams.get('category') !== ProductCategory.Video && (
                <input
                  type="checkbox"
                  name="category"
                  ref={videocameraRef}
                  value={ProductCategory.Video}
                  disabled={filterData.category === ProductCategory.Photo}
                  onChange={handleChange}
                />
              )}
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              {typesBySearchParams?.includes(ProductType.Digital) && (
                <input
                  type="checkbox"
                  value={ProductType.Digital}
                  ref={typeDigitalRef}
                  onChange={handleChange}
                  defaultChecked
                />
              )}
              {!typesBySearchParams?.includes(ProductType.Digital) && (
                <input
                  type="checkbox"
                  value={ProductType.Digital}
                  onChange={handleChange}
                  ref={typeDigitalRef}
                />
              )}
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              {typesBySearchParams?.includes(ProductType.Film) && (
                <input
                  type="checkbox"
                  value={ProductType.Film}
                  ref={typeFilmRef}
                  disabled={filterData.category === ProductCategory.Video}
                  onChange={handleChange}
                  defaultChecked
                />
              )}
              {!typesBySearchParams?.includes(ProductType.Film) && (
                <input
                  type="checkbox"
                  value={ProductType.Film}
                  ref={typeFilmRef}
                  onChange={handleChange}
                  disabled={filterData.category === ProductCategory.Video}
                />
              )}
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              {typesBySearchParams?.includes(ProductType.Instant) && (
                <input
                  type="checkbox"
                  ref={typeInstantRef}
                  value={ProductType.Instant}
                  disabled={filterData.category === ProductCategory.Video}
                  onChange={handleChange}
                  defaultChecked
                />
              )}
              {!typesBySearchParams?.includes(ProductType.Instant) && (
                <input
                  type="checkbox"
                  ref={typeInstantRef}
                  onChange={handleChange}
                  value={ProductType.Instant}
                  disabled={filterData.category === ProductCategory.Video}
                />
              )}
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              {typesBySearchParams?.includes(ProductType.Collectible) && (
                <input
                  type="checkbox"
                  ref={typeCollectebleRef}
                  onChange={handleChange}
                  value={ProductType.Collectible}
                  defaultChecked
                />
              )}
              {!typesBySearchParams?.includes(ProductType.Collectible) && (
                <input
                  type="checkbox"
                  onChange={handleChange}
                  ref={typeCollectebleRef}
                  value={ProductType.Collectible}
                />
              )}
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              {levelsBySearchParams?.includes(ProductLevel.Zero) && (
                <input
                  type="checkbox"
                  ref={levelZeroRef}
                  name="zero"
                  value={ProductLevel.Zero}
                  onChange={handleChange}
                  defaultChecked
                />
              )}
              {!levelsBySearchParams?.includes(ProductLevel.Zero) && (
                <input
                  type="checkbox"
                  ref={levelZeroRef}
                  name="zero"
                  onChange={handleChange}
                  value={ProductLevel.Zero}
                />
              )}
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              {levelsBySearchParams?.includes(ProductLevel.Amateur) && (
                <input
                  type="checkbox"
                  ref={levelAmateurRef}
                  name="non-professional"
                  value={ProductLevel.Amateur}
                  onChange={handleChange}
                  defaultChecked
                />
              )}
              {!levelsBySearchParams?.includes(ProductLevel.Amateur) && (
                <input
                  type="checkbox"
                  ref={levelAmateurRef}
                  name="non-professional"
                  onChange={handleChange}
                  value={ProductLevel.Amateur}
                />
              )}
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              {levelsBySearchParams?.includes(ProductLevel.Pro) && (
                <input
                  type="checkbox"
                  ref={levelProRef}
                  name="professional"
                  value={ProductLevel.Pro}
                  onChange={handleChange}
                  defaultChecked
                />
              )}
              {!levelsBySearchParams?.includes(ProductLevel.Pro) && (
                <input
                  type="checkbox"
                  ref={levelProRef}
                  name="professional"
                  onChange={handleChange}
                  value={ProductLevel.Pro}
                />
              )}
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>
        <button className="btn catalog-filter__reset-btn" type="reset">
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default Filter;
