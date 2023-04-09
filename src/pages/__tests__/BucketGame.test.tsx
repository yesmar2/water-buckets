import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import BucketGame from '../BucketGame';

const mockBucketOneSize = '5';
const mockBucketTwoSize = '3';
const mockTargetUnits = '4';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    ...originalModule,
    useSearchParams: () => [
      new URLSearchParams({
        bucketOneSize: mockBucketOneSize,
        bucketTwoSize: mockBucketTwoSize,
        targetUnits: mockTargetUnits,
      }),
    ],
  };
});

const setup = () =>
  render(
    <BrowserRouter>
      <BucketGame />
    </BrowserRouter>
  );

describe('<BucketGame>', () => {
  it('renders title', () => {
    setup();

    const targetText = screen.getByRole('heading', {
      name: `Target: ${mockTargetUnits} unit(s)`,
    });

    expect(targetText).toBeInTheDocument();
  });

  it('renders bucket one size', () => {
    setup();
    const bucketOneText = screen.getByText(
      `Size: ${mockBucketOneSize} unit(s)`
    );
    expect(bucketOneText).toBeInTheDocument();
  });

  it('renders bucket two size', () => {
    setup();
    const bucketTwoText = screen.getByText(
      `Size: ${mockBucketTwoSize} unit(s)`
    );
    expect(bucketTwoText).toBeInTheDocument();
  });

  it('clicking the fill button fills bucket', () => {
    setup();
    const bucketOneFillButton = screen.getAllByRole('button', {
      name: 'Fill',
    })[0];
    fireEvent.click(bucketOneFillButton);
    const fillText = screen.getByText(`${mockBucketOneSize} unit(s)`);
    expect(fillText).toBeInTheDocument();
  });

  it('clicking the dump button dumps bucket', () => {
    setup();
    const bucketOneFillButton = screen.getAllByRole('button', {
      name: 'Fill',
    })[0];
    fireEvent.click(bucketOneFillButton);
    const fillText = screen.getByText(`${mockBucketOneSize} unit(s)`);
    expect(fillText).toBeInTheDocument();

    const bucketOneDumpButton = screen.getAllByRole('button', {
      name: 'Dump',
    })[0];
    fireEvent.click(bucketOneDumpButton);
    expect(
      screen.queryByText(`${mockBucketOneSize} unit(s)`)
    ).not.toBeInTheDocument();
  });

  it('clicking the transfer button transfers units correctly', () => {
    setup();
    const bucketOneFillButton = screen.getAllByRole('button', {
      name: 'Fill',
    })[0];
    fireEvent.click(bucketOneFillButton);
    const fillText = screen.getByText(`${mockBucketOneSize} unit(s)`);
    expect(fillText).toBeInTheDocument();

    const bucketOneTransferButton = screen.getAllByRole('button', {
      name: 'Transfer',
    })[0];
    fireEvent.click(bucketOneTransferButton);
    const transferAmount = mockBucketTwoSize;
    const amountLeft = mockBucketOneSize - mockBucketTwoSize;

    expect(screen.getByText(`${transferAmount} unit(s)`)).toBeInTheDocument();
    expect(screen.getByText(`${amountLeft} unit(s)`)).toBeInTheDocument();
  });

  it('shows winner text when the game is won', () => {
    setup();
    const bucketOneFillButton = screen.getAllByRole('button', {
      name: 'Fill',
    })[0];
    const bucketOneTransferButton = screen.getAllByRole('button', {
      name: 'Transfer',
    })[0];
    const bucketTwoDumpButton = screen.getAllByRole('button', {
      name: 'Dump',
    })[1];
    fireEvent.click(bucketOneFillButton);
    fireEvent.click(bucketOneTransferButton);
    fireEvent.click(bucketTwoDumpButton);
    fireEvent.click(bucketOneTransferButton);
    fireEvent.click(bucketOneFillButton);
    fireEvent.click(bucketOneTransferButton);

    expect(screen.getByText(`Winner in 6 step(s)!`)).toBeInTheDocument();
  });

  it('resets game correctly', () => {
    setup();
    const bucketOneFillButton = screen.getAllByRole('button', {
      name: 'Fill',
    })[0];
    const bucketOneTransferButton = screen.getAllByRole('button', {
      name: 'Transfer',
    })[0];
    const bucketTwoDumpButton = screen.getAllByRole('button', {
      name: 'Dump',
    })[1];
    fireEvent.click(bucketOneFillButton);
    fireEvent.click(bucketOneTransferButton);
    fireEvent.click(bucketTwoDumpButton);

    expect(screen.getByText(`Steps: 3`)).toBeInTheDocument();

    const resetIcon = screen.getByTestId('resetIcon');
    fireEvent.click(resetIcon);

    expect(screen.getByText(`Steps: 0`)).toBeInTheDocument();
  });
});
