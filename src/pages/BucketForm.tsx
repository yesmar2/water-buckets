import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { getMostEfficientSteps } from '../utils/bucketUtils';

const BucketFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BucketFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  align-items: flex-start;
`;

const BucketFormButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ErrorText = styled.p`
  color: #ee6352;
  margin: 0 0 12px;
`;

const InputStyled = styled(Input)`
  margin-bottom: 12px;
`;

const SolutionButton = styled(Button)`
  flex: 1;
`;

const GameButton = styled(Button)`
  flex: 1;
  margin-left: 12px;
`;

const BUCKET_ONE_SIZE = 'bucketOneSize';
const BUCKET_TWO_SIZE = 'bucketTwoSize';
const TARGET_UNITS = 'targetUnits';

const BucketForm: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [buttonsDisabled, setbuttonsDisabled] = useState(true);
  const [inputField, setInputField] = useState({
    [BUCKET_ONE_SIZE]: '',
    [BUCKET_TWO_SIZE]: '',
    [TARGET_UNITS]: '',
  });

  const bucketOneSize = inputField[BUCKET_ONE_SIZE];
  const bucketTwoSize = inputField[BUCKET_TWO_SIZE];
  const targetUnits = inputField[TARGET_UNITS];

  useEffect(() => {
    setbuttonsDisabled(!bucketOneSize || !bucketTwoSize || !targetUnits);
  }, [bucketOneSize, bucketTwoSize, targetUnits]);

  const validInput = () => {
    const bucketOneSizeInt = parseInt(bucketOneSize, 10);
    const bucketTwoSizeInt = parseInt(bucketTwoSize, 10);
    const targetUnitsInt = parseInt(targetUnits, 10);

    if (bucketOneSizeInt >= 100 || bucketTwoSizeInt >= 100 || targetUnitsInt >= 100) {
      setError('All inputs must be less than 100');
      return false;
    }
    const efficientSteps = getMostEfficientSteps(
      bucketOneSizeInt,
      bucketTwoSizeInt,
      targetUnitsInt,
    );

    if (efficientSteps[0].error) {
      setError(efficientSteps[0].error);
      return false;
    }

    return true;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (validInput()) {
      navigate(
        `/game?bucketOneSize=${bucketOneSize}&bucketTwoSize=${bucketTwoSize}&targetUnits=${targetUnits}`
      );
    }

    event.preventDefault();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setInputField((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const goToSolution = () => {
    if (validInput()) {
      navigate(
        `/solution?bucketOneSize=${bucketOneSize}&bucketTwoSize=${bucketTwoSize}&targetUnits=${targetUnits}`
      );
    }
  };

  return (
    <BucketFormContainer>
      <h1>Water Buckets</h1>
      {error && <ErrorText>{error}</ErrorText>}
      <BucketFormStyled onSubmit={handleSubmit}>
        <InputStyled
          name={BUCKET_ONE_SIZE}
          placeholder="Bucket One Size"
          value={inputField[BUCKET_ONE_SIZE]}
          onChange={handleInputChange}
          type="number"
        />
        <InputStyled
          name={BUCKET_TWO_SIZE}
          placeholder="Bucket Two Size"
          value={inputField[BUCKET_TWO_SIZE]}
          onChange={handleInputChange}
          type="number"
        />
        <InputStyled
          name={TARGET_UNITS}
          placeholder="Number of Units"
          value={inputField[TARGET_UNITS]}
          onChange={handleInputChange}
          type="number"
        />
        <BucketFormButtonContainer>
          <SolutionButton disabled={buttonsDisabled} onClick={goToSolution}>
            Optimal Solution
          </SolutionButton>
          <GameButton type="submit" disabled={buttonsDisabled}>
            Play Game
          </GameButton>
        </BucketFormButtonContainer>
      </BucketFormStyled>
    </BucketFormContainer>
  );
};

export default BucketForm;
