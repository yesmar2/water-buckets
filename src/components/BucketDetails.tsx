import styled from 'styled-components';
import Bucket from '../components/Bucket';
import BucketButtons from '../components/BucketButtons';

interface BucketDetailsProps {
  bucketSize: number;
  bucketFill: number;
  bucketHeight: string;
  bucketNumber: number;
  onFill: (bucketNumber: number) => void;
  onDump: (bucketNumber: number) => void;
  onTransfer: (bucketNumber: number) => void;
}

const BucketButtonsContainer = styled.div`
  margin-top: 12px;
`;

const BucketSizeText = styled.p`
  text-align: center;
`;

const BucketDetails: React.FC<BucketDetailsProps> = (props) => {
  const {
    bucketSize,
    bucketFill,
    bucketHeight,
    bucketNumber,
    onFill,
    onDump,
    onTransfer
  } = props;

  return (
    <div>
      <BucketSizeText>Size: {bucketSize} unit(s)</BucketSizeText>
      <Bucket
        containerHeight="200px"
        height={bucketHeight}
        width="150px"
        size={bucketSize}
        fill={bucketFill}
        showFill
      />
      <BucketButtonsContainer>
        <BucketButtons
          bucketNumber={bucketNumber}
          onFill={onFill}
          onDump={onDump}
          onTransfer={onTransfer}
        />
      </BucketButtonsContainer>
    </div>
  );
};

export default BucketDetails;
