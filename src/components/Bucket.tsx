import styled from 'styled-components';

interface BucketProps {
  size: number;
  fill: number;
}

interface BucketFillProps {
  height: number;
}

const BucketSizeText = styled.p`
  text-align: center;
`;

const BucketContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 200px;
  width: 250px;
  background: #e0e7f0;
  border-bottom-left-radius: 15px 15px;
  border-bottom-right-radius: 15px 15px;
`;

const BucketFill = styled.div<BucketFillProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3fa7d6;
  // animation: fill-${(props) => props.height} 0.5s ease-in forwards;
  border-bottom-left-radius: 15px 15px;
  border-bottom-right-radius: 15px 15px;
  color: #e0e7f0;
  transition: height 0.5s ease-in;
  height: ${(props) => props.height}%;
`;

const Bucket: React.FC<BucketProps> = (props) => {
  const { size, fill } = props;

  const fillPercentage = Math.round((fill / size) * 100);

  return (
    <div>
      <BucketSizeText>Size: {size} units</BucketSizeText>
      <BucketContainer>
        <BucketFill height={fillPercentage}>
          {fill > 0 && `${fill} units`}
        </BucketFill>
      </BucketContainer>
    </div>
  );
};

export default Bucket;
