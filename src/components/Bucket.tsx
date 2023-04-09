import styled from 'styled-components';

interface BucketProps {
  size: number;
  fill: number;
  height: string;
  width: string;
  containerHeight: string;
  showFill?: boolean;
}

interface BucketContainerProps {
  height: string;
}

interface BucketStyledProps {
  height: string;
  width: string;
}

interface BucketFillProps {
  height: string;
}

const BucketContainer = styled.div<BucketContainerProps>`
  height: ${(props) => props.height};
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const BucketStyled = styled.div<BucketStyledProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background: #e0e7f0;
  border-bottom-left-radius: 15px 15px;
  border-bottom-right-radius: 15px 15px;
`;

const BucketFill = styled.div<BucketFillProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3fa7d6;
  border-bottom-left-radius: 15px 15px;
  border-bottom-right-radius: 15px 15px;
  color: #e0e7f0;
  transition: height 0.5s ease-in;
  height: ${(props) => props.height};
`;

const Bucket: React.FC<BucketProps> = (props) => {
  const { size, fill, height, width, containerHeight, showFill } = props;

  const fillHeight = `${Math.round((fill / size) * 100)}%`;

  return (    
    <BucketContainer height={containerHeight}>  
      <BucketStyled height={height} width={width}>
        <BucketFill height={fillHeight}>
          {showFill && fill > 0 && `${fill} unit(s)`}
        </BucketFill>
      </BucketStyled>
    </BucketContainer>
  );
};

Bucket.defaultProps = {
  showFill: false,
}

export default Bucket;
