import styled from 'styled-components';
import { ReactNode } from 'react';

const HeaderIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
  transform: scale(1.5);
  cursor: pointer;
`;

interface HeaderIconProps {
  children: ReactNode;
}

const HeaderIcon = ({ children }: HeaderIconProps) => {
  return (
    <HeaderIconContainer>
      {children}
    </HeaderIconContainer>
  );
};

export default HeaderIcon;
