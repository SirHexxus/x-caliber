import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import Navbar from './Components/Navbar/Nav';
import Home from './Components/Home/Home';
// import Measurements from './Components/Tables/Measurement';
import SignUp from './Components/Account/SignUp';
import SignIn from './Components/Account/SignIn';
import Contact from './Components/Contact/Contact';
import MeasureWrapper from './Components/Tables/MeasureWrapper';
import Footer from './Components/Footer/Footer';

const initUser = {
  name: '',
  nameInvalid: '',
  username: '',
  usernameInvalid: '',
  email: '',
  emailInvalid: '',
  password: '',
  passwordInvalid: '',
  passCheck: '',
  passCheckInvalid: '',
  moreInfo: false
};

class App extends Component {
  state = {
    currUser: initUser,
    subscribed: false,
    login: false
  };

  signUp = newUser => {
    this.setState({ currUser: newUser });
  };

  signIn = user => {
    this.setState({ currUser: user });
  };

  // handleSubcribe = () => {
  //   this.state.subscribed ?  : { divStyleAgain };
  // };

  // handleLoggedIn = () => {
  //   this.state.login ? console.log('Logged In!') : console.log('Logged Out!');
  // };

  render() {
    return (
      <BrowserRouter>
        <div className='App screen'>
          <Navbar />
          <Route exact path='/' component={Home} />
          <Route
            path='/signup'
            render={() => <SignUp signUp={this.signUp} />}
          />
          <Route
            path='/signin'
            render={() => <SignIn signIn={this.signIn} />}
          />
          <Route path='/newmeasure' component={MeasureWrapper} />
          {/* <Route path='/measurements' component={Measurements} /> */}
          <Route path='/contact' component={Contact} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
