import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { MdHome } from 'react-icons/md';
import HeaderIcon from './HeaderIcon';
;

const HeaderContainer = styled.header`
  display: flex;
  height: 50px;
  align-items: center;
  padding: 0 24px;
`;

const HeaderTitle = styled.h1`
  flex: 1;
  margin: 0;
  font-size: 24px;
`;

const HeaderIcons = styled.div`
  display: flex;
`;

interface HeaderProps {
  title: string;
  children: ReactNode;
}

const Header = ({ title, children }: HeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderTitle>{title}</HeaderTitle>
      <HeaderIcons>
        {children}
        <HeaderIcon>
          <Link to="/">
            <MdHome />
          </Link>
        </HeaderIcon>
      </HeaderIcons>
    </HeaderContainer>
  );
};

export default Header;
