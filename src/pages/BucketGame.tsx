import Bucket from '../components/Bucket';
import styled from 'styled-components';
import BucketButtons from '../components/BucketButtons';
import { useState } from 'react';

interface BucketProperties {
  size: number;
  fill: number;
}

interface BucketObject {
  [key: string]: BucketProperties;
}

const BucketsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 24px;
`;

const BucketButtonsContainer = styled.div`
  margin-top: 12px;
`;

const BUCKET_ONE_NAME = 'bucketOne';
const BUCKET_TWO_NAME = 'bucketTwo';

const BucketGame = () => {
  const initialBucketData: BucketObject = {
    [BUCKET_ONE_NAME]: { size: 5, fill: 0 },
    [BUCKET_TWO_NAME]: { size: 3, fill: 0 },
  };

  const [steps, setSteps] = useState(0);
  const [bucketData, setBucketData] = useState<BucketObject>(initialBucketData);
  const { bucketOne, bucketTwo } = bucketData;

  const incrementStep = () => {
    setSteps(prevState => prevState + 1);
  }

  const onFill = (bucketName: string) => {
    incrementStep();
    setBucketData((prevData: BucketObject) => {
      const bucketData = prevData[bucketName];
      return {
        ...prevData,
        [bucketName]: {
          ...bucketData,
          fill: bucketData.size,
        },
      };
    });
  };

  const onDump = (bucketName: string) => {
    incrementStep();
    setBucketData((prevData: BucketObject) => {
      const bucketData = prevData[bucketName];
      return {
        ...prevData,
        [bucketName]: {
          ...bucketData,
          fill: 0,
        },
      };
    });
  };

  const onTransfer = (bucketName: string) => {
    incrementStep();
    setBucketData((prevData: BucketObject) => {
      const { fill: prevBucketOneFill, size: prevBucketOneSize } = prevData[BUCKET_ONE_NAME];
      const { fill: prevBucketTwoFill, size: prevBucketTwoSize } = prevData[BUCKET_TWO_NAME];

      let newBucketOneFill = 0;
      let newBucketTwoFill = 0;
      if (bucketName === BUCKET_ONE_NAME) {
        const bucketTwoSpaceRemaining = prevBucketTwoSize - prevBucketTwoFill;
        if (prevBucketOneFill >= bucketTwoSpaceRemaining) {
          newBucketOneFill = prevBucketOneFill - bucketTwoSpaceRemaining;
          newBucketTwoFill = prevBucketTwoSize;
        } else {
          newBucketOneFill = 0;
          newBucketTwoFill = prevBucketTwoFill + prevBucketOneFill;
        }
      } else {
        const bucketOneSpaceRemaining = prevBucketOneSize - prevBucketOneFill;
        if (prevBucketTwoFill >= bucketOneSpaceRemaining) {
          newBucketTwoFill = prevBucketTwoFill - bucketOneSpaceRemaining;
          newBucketOneFill = prevBucketOneSize;
        } else {
          newBucketTwoFill = 0;
          newBucketOneFill = prevBucketOneFill + prevBucketTwoFill;
        }
      }
      
      return {
        ...prevData,
        [BUCKET_ONE_NAME]: {
          ...prevData[BUCKET_ONE_NAME],
          fill: newBucketOneFill,
        },
        [BUCKET_TWO_NAME]: {
          ...prevData[BUCKET_TWO_NAME],
          fill: newBucketTwoFill,
        },
      };
    });
  };

  return (
    <>
      <h1>Goal: 4 units</h1>
      <h2>Steps: {steps}</h2>
      <BucketsContainer>
        <div>
          <Bucket size={bucketOne.size} fill={bucketOne.fill} />
          <BucketButtonsContainer>
            <BucketButtons
              bucketName={BUCKET_ONE_NAME}
              onFill={onFill}
              onDump={onDump}
              onTransfer={onTransfer}
            />
          </BucketButtonsContainer>
        </div>
        <div>
          <Bucket size={bucketTwo.size} fill={bucketTwo.fill} />
          <BucketButtonsContainer>
            <BucketButtons
              bucketName={BUCKET_TWO_NAME}
              onFill={onFill}
              onDump={onDump}
              onTransfer={onTransfer}
            />
          </BucketButtonsContainer>
        </div>
      </BucketsContainer>
    </>
  );
};

export default BucketGame;
