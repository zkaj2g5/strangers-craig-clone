import React, { useState } from 'react';
import axiosWithAuth from './utils/axiosWithAuth';
import { Input } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const Registration = (props) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const history = useHistory();

  const register = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .post(
        'https://strangers-things.herokuapp.com/api/2007-UNF-RM-WEB-PT/users/register',
        { user: credentials }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem('token', response.data.data.token);
        console.log(response.data.data);
        history.push('/');
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };

  const handleChanges = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
    console.log(credentials);
  };

  console.log('credentials', { user: credentials });
  return (
    <div className='auth-box'>
      <h1 className='auth-header'>Create an account </h1>
      <div className='flexbox-column'>
        <Input
          className='input'
          name='username'
          value={credentials.username}
          onChange={handleChanges}
          icon='address book outline'
          placeholder='Username'
        />
        <Input
          icon='lock'
          placeholder='Password'
          name='password'
          value={credentials.password}
          onChange={handleChanges}
        />
        <button className='ui button' onClick={register}>
          Create account
        </button>
      </div>
    </div>
  );
};

export default Registration;
