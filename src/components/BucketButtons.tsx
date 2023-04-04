import styled from 'styled-components';

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 12px;
`;


const Button = styled.button`
  border: 1px solid #3fa7d6;
  border-radius: 4px;
  margin: 0;
  padding: 4px 8px;
  width: auto;
  overflow: visible;
  background-color: transparent;
  color: #3fa7d6;
  font: inherit;
  font-size: 14px;
  cursor: pointer;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;
`;

interface BucketButtonsProps {
  bucketName: string;
  onFill: (bucketName: string) => void;
  onDump: (bucketName: string) => void;
  onTransfer: (bucketName: string) => void;
}

const BucketButtons: React.FC<BucketButtonsProps> = (props) => {
  const { bucketName, onFill, onDump, onTransfer } = props;

  const onFillClick = () => {
    onFill(bucketName);
  }

  const onDumpClick = () => {
    onDump(bucketName);
  }

  const onTransferClick = () => {
    onTransfer(bucketName);
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
