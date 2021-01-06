import React from "react";
import ReactDOM from "react-dom";
import Routes from "./components/utils/Routes"
import "nes.css/css/nes.min.css";

import {
  BrowserRouter as Router,
} from 'react-router-dom';


const App = () => {
  return (
    <div className="app">
     <Router>
       <Routes/>
     </Router> 
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
