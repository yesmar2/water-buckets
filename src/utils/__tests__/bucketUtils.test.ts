import { getMostEfficientSteps } from '../bucketUtils';

describe('getMostEfficientSteps function', () => {
  it('should return most efficient step with 5, 3, 4 arguments', () => {
    const solution = [
      {
        bucketOneFill: 0,
        bucketTwoFill: 0,
        description: 'Containers start empty',
      },
      {
        bucketOneFill: 5,
        bucketTwoFill: 0,
        description: 'Fill bucket 1',
      },
      {
        bucketOneFill: 2,
        bucketTwoFill: 3,
        description: 'Transfer bucket 1 to bucket 2',
      },
      {
        bucketOneFill: 2,
        bucketTwoFill: 0,
        description: 'Dump bucket 2',
      },
      {
        bucketOneFill: 0,
        bucketTwoFill: 2,
        description: 'Transfer bucket 1 to bucket 2',
      },
      {
        bucketOneFill: 5,
        bucketTwoFill: 2,
        description: 'Fill bucket 1',
      },
      {
        bucketOneFill: 4,
        bucketTwoFill: 3,
        description: 'Transfer bucket 1 to bucket 2',
      },
    ];

    expect(getMostEfficientSteps(5, 3, 4)).toEqual(solution);
  });

  it('should return most efficient step with 1, 10, 2 arguments', () => {
    const solution = [
      {
        bucketOneFill: 0,
        bucketTwoFill: 0,
        description: 'Containers start empty',
      },
      {
        bucketOneFill: 1,
        bucketTwoFill: 0,
        description: 'Fill bucket 1',
      },
      {
        bucketOneFill: 0,
        bucketTwoFill: 1,
        description: 'Transfer bucket 1 to bucket 2',
      },
      {
        bucketOneFill: 1,
        bucketTwoFill: 1,
        description: 'Fill bucket 1',
      },
      {
        bucketOneFill: 0,
        bucketTwoFill: 2,
        description: 'Transfer bucket 1 to bucket 2',
      },
    ];

    expect(getMostEfficientSteps(1, 10, 2)).toEqual(solution);
  });

  it('should return most efficient step with 1, 10, 8 arguments', () => {
    const solution = [
      {
        bucketOneFill: 0,
        bucketTwoFill: 0,
        description: 'Containers start empty',
      },
      {
        bucketOneFill: 0,
        bucketTwoFill: 10,
        description: 'Fill bucket 2',
      },
      {
        bucketOneFill: 1,
        bucketTwoFill: 9,
        description: 'Transfer bucket 2 to bucket 1',
      },
      {
        bucketOneFill: 0,
        bucketTwoFill: 9,
        description: 'Dump bucket 1',
      },
      {
        bucketOneFill: 1,
        bucketTwoFill: 8,
        description: 'Transfer bucket 2 to bucket 1',
      },
    ];

    expect(getMostEfficientSteps(1, 10, 8)).toEqual(solution);
  });

  it('should return error with 1, 10, 20 arguments', () => {
    const solution = [
      {
        bucketOneFill: 0,
        bucketTwoFill: 0,
        error: 'Target cannot be larger than both buckets',
      },
    ];

    expect(getMostEfficientSteps(1, 10, 20)).toEqual(solution);
  });

  it('should return error with 2, 10, 3 arguments', () => {
    const solution = [
      {
        bucketOneFill: 0,
        bucketTwoFill: 0,
        error: 'Two even buckets cannot fill an odd target',
      },
    ];

    expect(getMostEfficientSteps(2, 10, 3)).toEqual(solution);
  });

  it('should return error with 3, 6, 2 arguments', () => {
    const solution = [
      {
        bucketOneFill: 0,
        bucketTwoFill: 0,
        error: 'Target cannot be solved for',
      },
    ];

    expect(getMostEfficientSteps(3, 6, 2)).toEqual(solution);
  });
});
