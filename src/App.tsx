import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home';
import BucketGame from './pages/BucketGame';
import BucketForm from './pages/BucketForm';
import Answer from './pages/Answer';
import NotFound from './pages/NotFound';

const AppContainer = styled.main`
  display: flex;
  flex-direction: column;

`;

const routes = [
  {
    key: 'home',
    path: '/',
    element: <Home />,
  },
  {
    key: 'bucketForm',
    path: '/form',
    element: <BucketForm />,
  },
  {
    key: 'answer',
    path: '/answer',
    element: <Answer />,
  },
  {
    key: 'bucketGame',
    path: '/game',
    element: <BucketGame bucketOneSize={5} bucketTwoSize={3} targetUnits={4} />,
  },
  {
    key: 'notFound',
    path: '*',
    element: <NotFound />,
  },
];

function App() {
  return (
    <AppContainer>
      <Routes>
        {routes.map((route) => (
          <Route key={route.key} path={route.path} element={route.element} />
        ))}
      </Routes>
    </AppContainer>
  );
}

export default App;
