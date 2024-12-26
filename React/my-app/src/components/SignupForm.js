// src/components/SignupForm.js
import React, { Component } from 'react';
import axios from 'axios';


class SignupForm extends Component {
  state = {
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/signup', {
      user: {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation,
      },
    })
    .then(response => {
      console.log('User signed up successfully:', response.data);
      alert("User signup successful");
    })
    .catch(error => {
      console.error('Error signing up:', error.response.data);
      alert("User signup failed");
    });
  };

  

  render() {
    return (
      
      <form onSubmit={this.handleSubmit}>
  <table>
    <tbody>
      <tr>
        <td>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
        </td>
      </tr>
      <tr>
        <td>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
        </td>
      </tr>
      <tr>
        <td>
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
            value={this.state.passwordConfirmation}
            onChange={this.handleChange}
            required
          />
        </td>
      </tr>
    </tbody>
  </table>
  <button style = {{marginTop:'15px'}} type="submit">Sign Up</button>
</form>

     
    );
  }
}

export default SignupForm;
