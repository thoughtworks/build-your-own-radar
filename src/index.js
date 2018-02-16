import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = () => (
  <Router>
      <Route exact path="/" component={Radar} />
      <Route path="/about" component={About} />
      <Route path="/admin" component={Admin} />
      <Route path="/feedbacks" component={Topics} />
  </Router>
);