import React, { Component } from "react";
import 'whatwg-fetch'

import { getFromStorage, setInStorage } from './../../utils/storage';

    export default class SignUp extends Component {
      constructor(props) {
        super(props);

        this.state = {
          isLoading: true,
          signUpError: '', 
          signUpFirstName: "",
          signUpLastName: "",
          signUpUsername: "",
          signUpEmail: "",
          signUpPassword: "",
          signUpUpdatesBox: false,
        };

        this.onChangeSignUpEmail = this.onChangeSignUpEmail.bind(this)
        this.onChangeSignUpPassword = this.onChangeSignUpPassword.bind(this)
        this.onChangeSignUpUsername = this.onChangeSignUpUsername.bind(this)
        this.onChangeSignUpFirstName = this.onChangeSignUpFirstName.bind(this)
        this.onChangeSignUpLastName = this.onChangeSignUpLastName.bind(this)
        this.onLogin = this.onLogin.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
      }

      componentDidMount() {
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token){
          const { token } = obj
          //verify token
          fetch('/api/account/verify?token' + token)
          .then(res => res.json())
          .then(json => {
            if(json.success) {
              this.setState({
              token,
              isLoading: false
            });
            } else {
              this.setState({
                isLoading: false,
              });
            }
          })
        } else {
          this.setState({
            isLoading: false,
          })
        }
      }

      onChangeSignUpEmail(event) {
        this.setState({
          signUpEmail: event.target.value,
        })
      }
      onChangeSignUpPassword(event) {
        this.setState({
          signUpPassword: event.target.value,
        })
      }
      onChangeSignUpUsername(event) {
        this.setState({
          signUpUsername: event.target.value,
        })
      }
      onChangeSignUpFirstName(event) {
        this.setState({
          signUpFirstName: event.target.value,
        })
      }
      onChangeSignUpLastName(event) {
        this.setState({
          signUpLastName: event.target.value,
        })
      }

      onSignUp(){
        //Grab State
        const {
          signUpFirstName,
          signUpLastName,
          signUpEmail,
          signUpPassword,
          signUpUsername
        }= this.state;

        this.setState({
          isLoading: true,
        })
        console.log(signUpFirstName)
        console.log(signUpLastName)
        console.log(signUpUsername)
        console.log(signUpEmail)
        console.log(signUpPassword)
       

        //Post request to backend
        fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            firstName: signUpFirstName,
            lastName: signUpLastName,
            email: signUpEmail,
            password: signUpPassword,
          }
          ),
        }).then(res => res.json())
          .then(json => {
            console.log("json", json)
            if(json.success){
              this.setState({
                isLoading: false,
                signUpEmail: "",
                signUpPassword: "",
                signUpFirstName: "",
                signUpLastName: "",
              });
            }else {
              this.setState({
                signUpError: json.message,
                isLoading: false,
              });
            }
          }
          ).catch(error => {
            throw(error);
        });
      }
      validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
      }

      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

      handleSubmit = event => {
        event.preventDefault();
      }
      
      
      render() {
        const {
          isLoading,
          token,
          signUpFirstName,
          signUpLastName,
          signUpEmail,
          signUpPassword,
          signUpError
        } = this.state;

        if(isLoading) {
          return (<div><p>Loading...</p></div>);
        }

        if(!token) {
          return (
          <main>
        <div className='container'>
          <h2 className='center'>New Account</h2>
          <form onSubmit={this.handleSubmit} className='border'>
            <ul className='register-form center'>
              <li>
                <input
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Name'
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </li>
              <li>
                <input
                  type='text'
                  id='username'
                  name='username'
                  placeholder='Username'
                  value={this.state.username}
                  onChange={this.handleChange}
                  required
                />
                <div className='clear red-text strong'>
                  {this.state.usernameInvalid}
                </div>
              </li>
              <li>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='example@email.com'
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
                <div className='clear red-text'>{this.state.emailInvalid}</div>
              </li>
              <li>
                <input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Password'
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
                <div className='clear red-text'>
                  {this.state.passwordInvalid}
                </div>
              </li>
              <li>
                <input
                  type='password'
                  name='passCheck'
                  id='passCheck'
                  placeholder='Password (Again)'
                  value={this.state.passCheck}
                  onChange={this.handleChange}
                  required
                />
                <div className='clear red-text'>
                  {this.state.passCheckInvalid}
                </div>
              </li>
              <p>
                <label>
                  <input
                    type='checkbox'
                    id='moreInfo'
                    value={this.state.moreInfo}
                    checked={this.state.moreInfo}
                    onChange={e => this.handleChange(e, true)}
                  />
                  <span>
                    Please inform me of upcoming Changes, Promotions, and News
                  </span>
                </label>
              </p>
              <br />
              <input
                type='submit'
                className='btn'
                defaultValue='Create Account'
              />
              <div className='clear'> </div>
            </ul>
          </form>
        </div>
      </main>
  )
        }
        
      }
}