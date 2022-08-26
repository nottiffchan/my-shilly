import './App.css'; 
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage/LandingPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StyleGuide from './pages/StyleGuide';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import LoginPage from './pages/LoginSignup/Login';
import ExplorePage from './pages/ExplorePage';
import SignupPage from './pages/LoginSignup/Signup';
import PrivateRoute from './routing/PrivateRoute';
// import PrivateScreen from './pages/PrivateScreen';
import React, {useState} from 'react';
import ForgotPassword from './pages/LoginSignup/ForgotPassword';
import ResetPassword from './pages/LoginSignup/ResetPassword';
import AboutPage from './pages/AboutPage';
import EditProfile from './pages/ProfilePage/EditProfile';
require('dotenv').config();

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  
  const handleUpdatedUser = (updatedUser) => {
    setCurrentUser(updatedUser);
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/login' render={ () => {return ( <LoginPage onUpdate={handleUpdatedUser}/>)} }></Route>
        <Route exact path='/signup' render={ () => {return ( <SignupPage onUpdate={handleUpdatedUser}/>)} }></Route>
        <Route exact path='/forgotPassword' component={ForgotPassword}></Route>
        <Route exact path="/resetPassword/:resetToken" component={ResetPassword}></Route>

        <React.Fragment>
          <NavBar updateUser={currentUser} />
          <Route exact path='/' component={LandingPage}></Route>
          {/* <Route exact path='/profile' component={ProfilePage}></Route> */}
          <PrivateRoute exact path="/profile" component={ProfilePage} />

          <Route exact path='/about' component={AboutPage}></Route>
          <Route exact path='/styleguide' component={StyleGuide}></Route>
          <Route exact path='/explore' component={ExplorePage}></Route>
          <Route exact path='/editprofile' render={ () => {return ( <EditProfile onUpdate={handleUpdatedUser}/>)} }></Route>
          <Route path='/user/:username' render={(props) => {
              return ( <ProfilePage {...props } /> )
          }} />
                
          <Footer />
        </React.Fragment>
      </Switch>
    </Router>
  );
}

export default App;