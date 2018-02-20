import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/src-backoffice/src/components/Header'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import React from 'react';

import Home from './components/radar/index';
import Admin from './components/src-backoffice/src/index';

class App extends Component {
  render() {
    return <Router>
      < div >
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/admin" component={Admin} />
        <Route path="/about" component={Admin} />
        <Route path="/feedbacks" component={Admin} />
      </div >
    </Router >;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));