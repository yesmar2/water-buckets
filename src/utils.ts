interface SolutionSteps {
  bucketOneFill: number;
  bucketTwoFill: number;
  description?: string;
  error?: string;
}

export const getMostEfficientSteps = (
  bucketOneSize: number,
  bucketTwoSize: number,
  targetUnits: number
): SolutionSteps[] => {
  let bucketQueue: number[][] = [];
  const visited: { [key: string]: string } = {};

  const getBucketState = (): number[] | undefined => {
    if (bucketQueue === undefined) return;
    const state = bucketQueue[0];
    bucketQueue = bucketQueue.slice(1);
    return state;
  };

  const addBucketState = (
    parentstate: string,
    newBucketState: number[]
  ): void => {
    if (String(newBucketState) in visited) return;
    visited[String(newBucketState)] = String(parentstate);
    bucketQueue.push(newBucketState);
  };

  const getSolution = (): SolutionSteps[] => {
    const solutionArray: string[][] = [];
    const jsonState = bucketQueue.slice(-1);
    let state: string | undefined = String(jsonState);

    while (state) {
      solutionArray.push(state.split(','));
      state = getParent(state);
    }
    solutionArray.reverse();

    return getDetailedSolution(solutionArray);
  };

  const getDetailedSolution = (solutionArray: string[][]): SolutionSteps[] => {
    const solutionSteps = [];

    if (solutionArray.length === 0) {
      return [{
        bucketOneFill: 0,
        bucketTwoFill: 0,
        error: 'Target cannot be solved for',
      }]
    }

    for (let i = 0; i < solutionArray.length; i++) {
      const bucketOneFill = parseInt(solutionArray[i][0], 10);
      const bucketTwoFill = parseInt(solutionArray[i][1], 10);

      if (i === 0) {
        solutionSteps.push({
          bucketOneFill,
          bucketTwoFill,
          description: 'Containers start empty',
        });
      } else {
        const prevBucketOneFill = parseInt(solutionArray[i - 1][0], 10);
        const prevBucketTwoFill = parseInt(solutionArray[i - 1][1], 10);

        let description = '';
        if (
          prevBucketTwoFill === bucketTwoFill &&
          prevBucketOneFill < bucketOneFill
        ) {
          description = `Fill bucket 1`;
        } else if (
          prevBucketOneFill === bucketOneFill &&
          prevBucketTwoFill < bucketTwoFill
        ) {
          description = `Fill bucket 2`;
        } else if (
          prevBucketOneFill > bucketOneFill &&
          prevBucketTwoFill < bucketTwoFill
        ) {
          description = `Transfer bucket 1 to bucket 2`;
        } else if (
          prevBucketTwoFill > bucketTwoFill &&
          prevBucketOneFill < bucketOneFill
        ) {
          description = `Transfer bucket 2 to bucket 1`;
        } else if (
          prevBucketTwoFill === bucketTwoFill &&
          prevBucketOneFill > bucketOneFill
        ) {
          description = `Dump bucket 1`;
        } else {
          description = `Dump bucket 2`;
        }

        solutionSteps.push({
          bucketOneFill,
          bucketTwoFill,
          description,
        });
      }
    }

    return solutionSteps;
  };

  const getParent = (childstate: string): string | undefined => {
    try {
      return visited[String(childstate)];
    } catch (e) {
      return undefined;
    }
  };

  const testBucket = (
    oldBucketState: number[],
    newBucketState: number[],
    targetUnits: number
  ): boolean => {
    const newA = newBucketState[0];
    const newB = newBucketState[1];
    addBucketState(String(oldBucketState), newBucketState);
    return newA === targetUnits || newB === targetUnits;
  };
  
  let error = null;
  if (targetUnits > bucketOneSize && targetUnits > bucketTwoSize) {
    error = 'Target cannot be larger than both buckets';
  } else if (targetUnits % 2 === 1 && bucketOneSize % 2 === 0 && bucketTwoSize % 2 === 0) {
    error = 'Two even buckets cannot fill an odd target';
  } else if (targetUnits >= 100 || bucketOneSize >= 100 || bucketTwoSize >= 100) {
    error = 'Target and bucket sizes must be less than 200';
  }

  if (error) {
    return [{
      bucketOneFill: 0,
      bucketTwoFill: 0,
      error,
    }]
  }

  addBucketState('', [0, 0]);

  while (true) {
    const oldBucketState = getBucketState();
    if (!oldBucketState) break;

    const bucketOneFill = oldBucketState[0];
    const bucketTwoFill = oldBucketState[1];

    if (testBucket(oldBucketState, [bucketOneSize, bucketTwoFill], targetUnits))
      break;
    if (testBucket(oldBucketState, [0, bucketTwoFill], targetUnits)) break;
    if (testBucket(oldBucketState, [bucketOneFill, bucketTwoSize], targetUnits))
      break;
    if (testBucket(oldBucketState, [bucketOneFill, 0], targetUnits)) break;

    const minAHasBRemaining = Math.min(
      bucketOneFill,
      bucketTwoSize - bucketTwoFill
    );
    if (
      testBucket(
        oldBucketState,
        [bucketOneFill - minAHasBRemaining, bucketTwoFill + minAHasBRemaining],
        targetUnits
      )
    )
      break;

    const minBHasARemaining = Math.min(
      bucketTwoFill,
      bucketOneSize - bucketOneFill
    );
    if (
      testBucket(
        oldBucketState,
        [bucketOneFill + minBHasARemaining, bucketTwoFill - minBHasARemaining],
        targetUnits
      )
    )
      break;
  }
  return getSolution();
};

export const getBucketHeights = (bucketOneSize: number, bucketTwoSize: number) => {
  let bucketOneHeight;
  let bucketTwoHeight;

  if (bucketOneSize >= bucketTwoSize) {
    bucketOneHeight = '100%';
    bucketTwoHeight = `${(bucketTwoSize / bucketOneSize) * 100}%`;
  } else {
    bucketOneHeight = `${(bucketOneSize / bucketTwoSize) * 100}%`;
    bucketTwoHeight = '100%';
  }

  return {
    bucketOneHeight,
    bucketTwoHeight,
  }
}