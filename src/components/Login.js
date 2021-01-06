import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Input } from "semantic-ui-react";
import axiosWithAuth from "./utils/axiosWithAuth";


const Login = (props) => {
    const history = useHistory();

const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const loggedinUser = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .post(
        "https://strangers-things.herokuapp.com/api/2007-UNF-RM-WEB-PT/users/login",
        { user: credentials }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.data.token); 
        history.push("/")
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };

  const handleChanges = (event) => {
    setCredentials({...credentials, [event.target.name]: event.target.value})
    //console.log("credentials", credentials)
  }
  //console.log("credentials", { user: credentials })
  return (
    <div className="auth-box login-box">
      <h1 className="auth-header">Log in</h1>
      <div className="flexbox-column">
        <Input
          className="input"
          name="username"
          value={credentials.username}
          onChange={handleChanges}
          icon="address book outline"
          placeholder="Username"
        />
        <Input
          icon="lock"
          placeholder="Password"
          name="password"
          value={credentials.password}
          onChange={handleChanges}
        />
        <button className="ui button" onClick={loggedinUser}>
          Log in
        </button>
      </div>
    </div>
  );
};

export default Login;
