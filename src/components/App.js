import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './Loading';

const Home = React.lazy(() => import('./Home'));
const Players = React.lazy(() => import('./Players'));
const Teams = React.lazy(() => import('./Teams'));
const Navbar = React.lazy(() => import('./Navbar'));
const TeamPage = React.lazy(() => import('./TeamPage'));
const Articles = React.lazy(() => import('./Articles'));

function App() {
  return (
    <Router>
      <div>
        <React.Suspense fallback={<Loading />}>
          <Navbar />

          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/players'>
              <Players />
            </Route>
            <Route path='/teams'>
              <Teams />
            </Route>
            <Route exact path='/:teamId'>
              <TeamPage />
            </Route>
            <Route path='/:teamId/articles'>
              <Articles />
            </Route>
            <Route render={() => <h1 className='text-center'>Four oh Four.</h1>} />
          </Switch>
        </React.Suspense>
      </div>
    </Router>
  );
}

export default App;
