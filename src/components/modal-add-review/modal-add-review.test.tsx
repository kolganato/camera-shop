import faker from 'faker';
import { makeFakeReviewNew } from '../../test-mocks/test-mocks';
import { withStore } from '../../utils/mock-component';
import { testInitialState } from '../../store/products/products-slice';
import { APIRoute, Status } from '../../config';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalAddReview from '.';

describe('Component: ModalAddReview', () => {
  it('Должен отрисовать правильно', async () => {
    const mockReviewNew = makeFakeReviewNew();
    const mockReview = {
      ...mockReviewNew,
      id: faker.random.alpha({ count: 4 }),
      createAt: String(new Date()),
    };

    const { withStoreComponent, mockAxiosAdapter } = withStore(<ModalAddReview productId={mockReview.cameraId} onCloseModal={} />, {
      PRODUCTS: {
        ...testInitialState,
        reviews: [mockReview],
        statusReviewData: Status.Idle,
      },
    });

    mockAxiosAdapter.onPost(APIRoute.Reviews).reply(200, mockReview);

    render(withStoreComponent);

    // await userEvent.type()

  });
});
