import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import React from 'react';

import Home from './components/radar/index';
import Admin from './components/src-backoffice/src/index';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/admink" component={Admin} />
      {/* <Route path="/about" component={About} />
      <Route path="/feedbacks" component={Topics} /> */}
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('app'));