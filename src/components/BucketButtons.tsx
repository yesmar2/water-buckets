import styled from 'styled-components';
import Button from './Button';

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 12px;
`;
interface BucketButtonsProps {
  bucketNumber: number;
  onFill: (bucketNumber: number) => void;
  onDump: (bucketNumber: number) => void;
  onTransfer: (bucketNumber: number) => void;
}

const BucketButtons: React.FC<BucketButtonsProps> = (props) => {
  const { bucketNumber, onFill, onDump, onTransfer } = props;

  const onFillClick = () => {
    onFill(bucketNumber);
  }

  const onDumpClick = () => {
    onDump(bucketNumber);
  }

  const onTransferClick = () => {
    onTransfer(bucketNumber);
  }

  return (
    <ButtonsContainer>
      <Button onClick={onFillClick}>Fill</Button>
      <Button onClick={onDumpClick}>Dump</Button>
      <Button onClick={onTransferClick}>Transfer</Button>
    </ButtonsContainer>
  );
}

export default BucketButtons;
