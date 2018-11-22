import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Saved from "./Saved";
import Search from "./Search";



class App extends Component {

  render() {
    return (

      <Router>
        <div>
          <Route exact path="/App extends Component{" component={Search} />
          <Route exact path="/saved" component={Saved} />
        </div>
      </Router>
    );
  }
}

export default App;