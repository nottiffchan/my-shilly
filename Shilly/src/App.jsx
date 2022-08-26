import './App.css';
import ExplorePage from './pages/ExplorePage';
import LandingPage from './pages/LandingPage/LandingPage';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './pages/Login';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <div className="App" >
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/explore">
            <ExplorePage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </div>
      </Switch>
    </>
  );
}

export default App;