import faker from 'faker';
import { extractActionsTypes, makeFakeReviewNew } from '../../test-mocks/test-mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import { testInitialState } from '../../store/products/products-slice';
import { APIRoute, TIME_TO_RENDER_PAGE } from '../../config';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalAddingReview from '.';
import { fetchReviewAction } from '../../store/api-actions';

describe('Component: ModalAddingReview', () => {
  it('Должен отрисовать правильно', () => {
    const expectedText = 'Оставить отзыв';
    const expectedCount = 5;
    const ratingTestId = `star-${expectedCount}`;
    const userElementTestId = 'userElement';
    const advantageElementTestId = 'advantageElement';
    const disadvantageElementTestId = 'disadvantageElement';
    const reviewElementTestId = 'reviewElement';
    const buttonTestId = 'button';

    const mockReviewNew = makeFakeReviewNew();
    const mockReview = {
      ...mockReviewNew,
      id: faker.random.alpha({ count: 4 }),
      createAt: String(new Date()),
    };

    const { withStoreComponent } = withStore(
      <ModalAddingReview productId={mockReview.cameraId} />,
      {
        PRODUCTS: {
          ...testInitialState,
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByTestId(ratingTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(userElementTestId)).toBeInTheDocument();
    expect(screen.getByTestId(advantageElementTestId)).toBeInTheDocument();
    expect(screen.getByTestId(disadvantageElementTestId)).toBeInTheDocument();
    expect(screen.getByTestId(reviewElementTestId)).toBeInTheDocument();
    expect(screen.getByTestId(buttonTestId)).toBeInTheDocument();
  });

  it('Должен имитировать действия пользователя при вводе данных', async () => {
    const mockReviewNew = makeFakeReviewNew();
    const mockReview = {
      ...mockReviewNew,
      id: faker.random.alpha({ count: 4 }),
      createAt: String(new Date()),
    };

    const ratingTestId = `star-${mockReview.rating}`;
    const userElementTestId = 'userElement';
    const advantageElementTestId = 'advantageElement';
    const disadvantageElementTestId = 'disadvantageElement';
    const reviewElementTestId = 'reviewElement';
    const buttonTestId = 'button';

    const ratingValue = mockReview.rating;
    const userElementValue = mockReview.userName;
    const advantageElementValue = mockReview.advantage;
    const disadvantageElementValue = mockReview.disadvantage;
    const reviewElementValue = mockReview.review;

    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <ModalAddingReview productId={mockReview.cameraId} />,
      {
        PRODUCTS: {
          ...testInitialState,
        },
      }
    );

    const preparedComponent = withHistory(withStoreComponent);

    mockAxiosAdapter.onPost(APIRoute.Reviews).reply(200, mockReview);

    render(preparedComponent);

    await userEvent.type(screen.getByTestId(ratingTestId), String(ratingValue));
    await userEvent.type(
      screen.getByTestId(userElementTestId),
      userElementValue
    );
    await userEvent.type(
      screen.getByTestId(advantageElementTestId),
      advantageElementValue
    );
    await userEvent.type(
      screen.getByTestId(disadvantageElementTestId),
      disadvantageElementValue
    );
    await userEvent.type(
      screen.getByTestId(reviewElementTestId),
      reviewElementValue
    );

    await userEvent.click(screen.getByTestId(buttonTestId));
    const actions = extractActionsTypes(mockStore.getActions());

    const waitingRenderTimer = setTimeout(() => {
      expect(actions).toEqual([
        fetchReviewAction.pending.type,
        fetchReviewAction.fulfilled.type,
      ]);
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);

    expect(screen.getByDisplayValue(ratingValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(userElementValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(advantageElementValue)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(disadvantageElementValue)
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue(reviewElementValue)).toBeInTheDocument();
  });
});
