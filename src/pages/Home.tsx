import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.header`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const LinkStyled = styled(Link)`
  font-size: 32px;
`;

const GameLink = styled(LinkStyled)`
  margin-bottom: 24px;
`;

const HelpText = styled.p`
  font-size: 14px;
  margin: 0;
`;

const Home = () => {
    return (
      <HomeContainer>
        <GameLink to="/game">
          Water Bucket Game
        </GameLink>
        <LinkStyled to="/form">
          Water Bucket Help
        </LinkStyled>
        <HelpText>Find the most effecient steps for water bucket game</HelpText>
      </HomeContainer>
    );
}

export default Home;