import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import BucketGame from './pages/BucketGame';
import BucketForm from './pages/BucketForm';
import BucketSolution from './pages/BucketSolution';
import NotFound from './pages/NotFound';

const AppContainer = styled.main`
  display: flex;
  flex-direction: column;
`;

const routes = [
  {
    key: 'bucketForm',
    path: '/',
    element: <BucketForm />,
  },
  {
    key: 'bucketSolution',
    path: '/solution',
    element: <BucketSolution />,
  },
  {
    key: 'bucketGame',
    path: '/game',
    element: <BucketGame />,
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
