import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import React from 'react';

import Home from './components/radar/index';

const App = () => (
  <Router>
      <Route exact path="/" component={Home} />
      {/* <Route path="/about" component={About} />
      <Route path="/admin" component={Admin} />
      <Route path="/feedbacks" component={Topics} /> */}
  </Router>
);

ReactDOM.render(<App/>, document.getElementById('app'));