import styled from 'styled-components';
import { ReactNode } from 'react';

const HeaderIconContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
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
