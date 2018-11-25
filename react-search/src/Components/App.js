import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Saved from "./Saved";
import Home from "./Home";



class App extends Component {

  render() {
    return (

      <Router>
        <div>
          <Route exact path="/home" component={Home} />
          <Route exact path="/saved" component={Saved} />
        </div>
      </Router>
    );
  }
}

export default App;