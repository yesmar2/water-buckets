import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MdRefresh, MdHelpOutline } from 'react-icons/md';
import BucketDetails from '../components/BucketDetails';
import Header from '../components/Header';
import HeaderIcon from '../components/HeaderIcon';
import { getBucketHeights } from '../utils/bucketUtils';

interface BucketGameProps {
  bucketOneSize: number;
  bucketTwoSize: number;
  targetUnits: number;
}

const ResetIcon = styled(MdRefresh)`
  transform: scale(1.5);
  cursor: pointer;
`;

const HelpIcon = styled(MdHelpOutline)`
  transform: scale(1.5);
  cursor: pointer;
`;

const BucketGameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 40px);
`;

const BucketsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 40px;
`;

const WinnerAlert = styled.p`
  color: #30da7b;
  font-size: 24px;
`

const TargetHeading = styled.h2`
  margin: 0;
`

const StepsHeading = styled.h3`
  margin: 0;
`

const BucketGame: React.FC<BucketGameProps> = (props) => {
  const { bucketOneSize, bucketTwoSize, targetUnits } = props;
  const { bucketOneHeight, bucketTwoHeight } = getBucketHeights(bucketOneSize, bucketTwoSize);
 
  const [bucketOneFill, setBucketOneFill] = useState(0);
  const [bucketTwoFill, setBucketTwoFill] = useState(0);
  const [steps, setSteps] = useState(0);

  const incrementStep = () => {
    setSteps((prevState) => prevState + 1);
  };

  const onFill = (bucketNumber: number) => {
    incrementStep();
    if (bucketNumber === 1) {
      setBucketOneFill(bucketOneSize);
    } else {
      setBucketTwoFill(bucketTwoSize);
    }
  };

  const onDump = (bucketNumber: number) => {
    incrementStep();
    if (bucketNumber === 1) {
      setBucketOneFill(0);
    } else {
      setBucketTwoFill(0);
    }
  };

  const onTransfer = (bucketNumber: number) => {
    incrementStep();
    let newBucketOneFill = 0;
    let newBucketTwoFill = 0;
    if (bucketNumber === 1) {
      const bucketTwoSpaceRemaining = bucketTwoSize - bucketTwoFill;
      if (bucketOneFill >= bucketTwoSpaceRemaining) {
        newBucketOneFill = bucketOneFill - bucketTwoSpaceRemaining;
        newBucketTwoFill = bucketTwoSize;
      } else {
        newBucketOneFill = 0;
        newBucketTwoFill = bucketTwoFill + bucketOneFill;
      }
    } else {
      const bucketOneSpaceRemaining = bucketOneSize - bucketOneFill;
      if (bucketTwoFill >= bucketOneSpaceRemaining) {
        newBucketTwoFill = bucketTwoFill - bucketOneSpaceRemaining;
        newBucketOneFill = bucketOneSize;
      } else {
        newBucketTwoFill = 0;
        newBucketOneFill = bucketOneFill + bucketTwoFill;
      }
    }

    setBucketOneFill(newBucketOneFill);
    setBucketTwoFill(newBucketTwoFill);
  };

  const resetGame = () => {
    setBucketOneFill(0);
    setBucketTwoFill(0);
    setSteps(0);
  }

  const gameWon = bucketOneFill === targetUnits || bucketTwoFill === targetUnits;

  return (
    <>
      <Header title="Water Bucket Game">
        <HeaderIcon>
          <Link to={`/solution?bucketOneSize=${bucketOneSize}&bucketTwoSize=${bucketTwoSize}&targetUnits=${targetUnits}`}>
            <HelpIcon />
          </Link>
        </HeaderIcon>
        <HeaderIcon>
          <ResetIcon onClick={resetGame} data-testid="resetIcon" />
        </HeaderIcon>
      </Header>
      <BucketGameContainer>
        {gameWon && (
          <WinnerAlert>
            Winner in {steps} step(s)!
          </WinnerAlert>
        )}
        <TargetHeading>Target: {targetUnits} unit(s)</TargetHeading>
        <StepsHeading>Steps: {steps}</StepsHeading>
        <BucketsContainer>
          <BucketDetails
            bucketSize={bucketOneSize}
            bucketFill={bucketOneFill}
            bucketHeight={bucketOneHeight}
            bucketNumber={1}
            onFill={onFill}
            onDump={onDump}
            onTransfer={onTransfer}
          />
          <BucketDetails
            bucketSize={bucketTwoSize}
            bucketFill={bucketTwoFill}
            bucketHeight={bucketTwoHeight}
            bucketNumber={2}
            onFill={onFill}
            onDump={onDump}
            onTransfer={onTransfer}
          />
        </BucketsContainer>
      </BucketGameContainer>
    </>
  );
};

export default BucketGame;
