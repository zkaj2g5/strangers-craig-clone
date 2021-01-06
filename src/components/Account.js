import React from "react";
import Login from "./Login";
import Registration from "./Registration";

const Account = (props) => {
   
    return (
        <>
        <div className="flexbox-column">
        <Login/>
        <p className="auth-divider">or</p>
        <Registration/>
    </div>
      </>
    );
  };
  
  export default Account;