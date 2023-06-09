import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { MdGames } from 'react-icons/md';
import Bucket from '../components/Bucket';
import Header from '../components/Header';
import HeaderIcon from '../components/HeaderIcon';
import { getBucketHeights, getMostEfficientSteps } from '../utils/bucketUtils';

const BucketSolutionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0;
`;

const BucketSolutionTableHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 600px;
  margin-bottom: 12px;
  padding: 0 16px;
`;

const BucketSolutionTableHeaderText = styled.div`
  margin-left: 12px;
  width: 50px;
`;

const BucketText = styled.div`
  font-size: 12px;
  text-align: center;
`;

const UnitsText = styled.div`
  font-size: 11px;
  text-align: center;
`;

const StepContainer = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0 3px 15px rgb(0 0 0 / 20%);
  margin-bottom: 12px;
  height: 100px;
  width: 600px;
  padding: 0 16px;
`;

const StepNumber = styled.div`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #3fa7d6;
  color: #3fa7d6;
  margin-right: 12px;
  font-weight: bold;
`;

const StepDescription = styled.div`
  font-size: 18px;
  flex: 1;
`;

const StepError = styled(StepDescription)`
  color: #ee6352;
`;

const StepBucket = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const BucketFill = styled.div`
  font-size: 12px;
  text-align: center;
  margin-bottom: 4px;
`;

const BucketSolution: React.FC<{}> = () => {
  const [searchParams] = useSearchParams();
  const bucketOneSize = parseInt(searchParams.get('bucketOneSize') ?? '0', 10);
  const bucketTwoSize = parseInt(searchParams.get('bucketTwoSize') ?? '0', 10);
  const targetUnits = parseInt(searchParams.get('targetUnits') ?? '0', 10);
  const { bucketOneHeight, bucketTwoHeight } = getBucketHeights(
    bucketOneSize,
    bucketTwoSize
  );

  // Ideally we would be making an api call to retrieve this data in a useEffect
  // Instead for this project we are memoizing the solution so it doesn't have
  // to recalculate everytime we re-render.
  const steps = useMemo(() => {
    return getMostEfficientSteps(bucketOneSize, bucketTwoSize, targetUnits);
  }, [bucketOneSize, bucketTwoSize, targetUnits]);

  const title = `Bucket 1 (${bucketOneSize} Units) - Bucket 2 (${bucketTwoSize} units) - Target (${targetUnits} units)`;

  return (
    <>
      <Header title={title}>
        <HeaderIcon>
          <Link to={`/game?bucketOneSize=${bucketOneSize}&bucketTwoSize=${bucketTwoSize}&targetUnits=${targetUnits}`}>
            <MdGames />
          </Link>
        </HeaderIcon>
      </Header>
      <BucketSolutionContainer>
        <BucketSolutionTableHeader>
          <BucketSolutionTableHeaderText>
            <BucketText>Bucket 1</BucketText>
            <UnitsText>({bucketOneSize} units)</UnitsText>
          </BucketSolutionTableHeaderText>
          <BucketSolutionTableHeaderText>
            <BucketText>Bucket 2</BucketText>
            <UnitsText>({bucketTwoSize} units)</UnitsText>
          </BucketSolutionTableHeaderText>
        </BucketSolutionTableHeader>
        {steps.map((step, index) => {
          const { bucketOneFill, bucketTwoFill, description, error } = step;
          const stepNumber = index + 1;
          return (
            <StepContainer key={stepNumber}>
              <StepNumber>{stepNumber}</StepNumber>
              {error ? (
                <StepError>{error}</StepError>
              ) : (
                <StepDescription>{description}</StepDescription>
              )}
              <StepBucket>
                <BucketFill>{bucketOneFill}</BucketFill>
                <Bucket
                  containerHeight="50px"
                  height={bucketOneHeight}
                  width="50px"
                  size={bucketOneSize}
                  fill={bucketOneFill}
                />
              </StepBucket>
              <StepBucket>
                <BucketFill>{bucketTwoFill}</BucketFill>
                <Bucket
                  containerHeight="50px"
                  height={bucketTwoHeight}
                  width="50px"
                  size={bucketTwoSize}
                  fill={bucketTwoFill}
                />
              </StepBucket>
            </StepContainer>
          );
        })}
      </BucketSolutionContainer>
    </>
  );
};

export default BucketSolution;
