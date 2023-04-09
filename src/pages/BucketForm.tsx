import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';

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

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [inputField, setInputField] = useState({
    [BUCKET_ONE_SIZE]: '',
    [BUCKET_TWO_SIZE]: '',
    [TARGET_UNITS]: '',
  });

  const bucketOneSize = inputField[BUCKET_ONE_SIZE];
  const bucketTwoSize = inputField[BUCKET_TWO_SIZE];
  const targetUnits = inputField[TARGET_UNITS];

  useEffect(() => {
    setButtonDisabled(!bucketOneSize || !bucketTwoSize || !targetUnits);
  }, [bucketOneSize, bucketTwoSize, targetUnits]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    navigate(
      `/game?bucketOneSize=${bucketOneSize}&bucketTwoSize=${bucketTwoSize}&targetUnits=${targetUnits}`
    );
    event.preventDefault();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputField((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const goToSolution = () => {
    navigate(
      `/solution?bucketOneSize=${bucketOneSize}&bucketTwoSize=${bucketTwoSize}&targetUnits=${targetUnits}`
    );
  }

  return (
    <BucketFormContainer>
      <h1>Water Buckets</h1>
      <BucketFormStyled onSubmit={handleSubmit}>
        <InputStyled
          name={BUCKET_ONE_SIZE}
          placeholder="Bucket One Size"
          value={inputField[BUCKET_ONE_SIZE]}
          onChange={handleInputChange}
        />
        <InputStyled
          name={BUCKET_TWO_SIZE}
          placeholder="Bucket Two Size"
          value={inputField[BUCKET_TWO_SIZE]}
          onChange={handleInputChange}
        />
        <InputStyled
          name={TARGET_UNITS}
          placeholder="Number of Units"
          value={inputField[TARGET_UNITS]}
          onChange={handleInputChange}
        />
        <BucketFormButtonContainer>
          <SolutionButton disabled={buttonDisabled} onClick={goToSolution}>
            Optimal Solution
          </SolutionButton>
          <GameButton type="submit" disabled={buttonDisabled}>
            Play Game
          </GameButton>
        </BucketFormButtonContainer>
      </BucketFormStyled>
    </BucketFormContainer>
  );
};

export default BucketForm;
