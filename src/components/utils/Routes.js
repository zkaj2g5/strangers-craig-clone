import React from "react";
import { Route } from "react-router-dom";
import Home from "../Home";
import Login from "../Login";
import Registration from "../Registration";
import Account from "../Account";
import CreatePost from "../CreatePost";
import PostMessage from "../PostMessage";


const Routes = (props) => {
  console.log("router props", props);
  return (
    <>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Registration />
      </Route>
      <Route path="/account">
        <Account />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
      <Route
        path="/sendmessage/:postId"
        render={(props) => <PostMessage {...props} />}
      ></Route>
     
    </>
  );
};

export default Routes;
