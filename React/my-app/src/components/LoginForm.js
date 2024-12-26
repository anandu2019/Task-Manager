// src/components/LoginForm.js
import React, { Component } from 'react';
import axios from 'axios';


class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/login', this.state)
      .then((response) => {
        alert('Login successful!');
        this.props.onLogin(response.data.token); // Pass token to parent
      })
      .catch((error) => {
        alert('Login failed. Please check your credentials.');
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
        </td></tr>
        <tr><td>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange}
          required
        />
       </td></tr>
       </tbody></table>
        <button style={{marginTop:'15px'}} type="submit">Login</button>
      </form>
    );
  }
}

export default LoginForm;
