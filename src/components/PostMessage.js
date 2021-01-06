import React, { useState } from "react";
import axiosWithAuth from "./utils/axiosWithAuth";
import { Input } from "semantic-ui-react";
import { useHistory } from "react-router-dom";


const PostMessage = (props) => {
  const [message, setMessage] = useState("");

  const history = useHistory();

  const sendMessage = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .post(
        `https://strangers-things.herokuapp.com/api/2007-UNF-RM-WEB-PT/posts/${props.match.params.postId}/messages`,
        { message: {
            content: message
        } }
      )
      .then((response) => {
        console.log(response);
        history.push("/")
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };
  const handleChanges = (event) => {
   
    setMessage(event.target.value);
  };
  
   console.log("messageData", { message: {
    content: message
} });
  console.log("props", props) 
  return (
    <div className="auth-box send-container" >
      <h1 className="auth-header" >Send Message</h1>
      <div className="flexbox-column " >
        <Input className="spacing-top"
          icon="chat"
          placeholder="Message"
          value={message}
          onChange={handleChanges}
        />

        <button className="ui button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default PostMessage;
