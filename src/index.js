import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/src-backoffice/src/components/Header'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
// import Login from './components/src-backoffice/src/components/Login';
// import React from 'react';

import axios from 'axios';
import cookie from 'cookie-machine';
import jwtDecode from 'jwt-decode';
import RadarApp from './components/radar/index';
import Admin from './components/src-backoffice/src/index';
import { App as AdminApp } from './components/src-backoffice/src/components/App/App';
import FeedbacksApp from './components/src-backoffice/src/components/FeedbacksApp';
import About from './components/src-backoffice/src/components/About';

const HEADERKEY = 'x-access-token';

class App extends Component {
  constructor() {
    super();
    axios.interceptors.request.use(function (config) {
      const token = cookie.get(HEADERKEY);

      if (token != null) {
        config.headers[HEADERKEY] = token;
      }

      return config;
    }, function (err) {
      return Promise.reject(err);
    });

    this.server = process.env.REACT_APP_API_URL || '';
  }

  componentWillMount() {
    const token = cookie.get(HEADERKEY);
    let username = null;

    if (token != null) {
      username = jwtDecode(token).username;
    }

    this.setState({
      username,
      loading: false
    });
  }

  login = ({ username, password }) => {
    this.setState({
      loading: true
    }, () => {
      axios.post(this.server + '/api/login', {
        username,
        password
      }).then(({ data, status }) => {
        if (status === 200) {
          cookie.set(HEADERKEY, data.token);
          let { username } = jwtDecode(data.token);

          this.setState({
            loading: false,
            username
          });
        }
      })
        .catch(() => {
          cookie.remove(HEADERKEY);

          this.setState({
            loading: false,
            username: null
          });
        });
    });
  };

  logout = () => {
    this.setState({
      loading: true
    }, () => {
      cookie.remove(HEADERKEY);
      this.setState({
        username: null,
        loading: false
      });
    });
  };

  renderIfLogged = (component) => () => {
    if (this.state.username) {
      return component;
    } else {
      return <Redirect to="/" />;
    }
  }


  render() {
    const { username, loading } = this.state;
    return <Router>
      < div >
        <Header username={username} loading={loading} login={this.login} logout={this.logout} />
        <Route exact path="/" component={RadarApp} />
        {/* {username && <Route path="/admin" component={Admin} />} */}
        {/* {username && <Route path="/admin" render={()=>{
          <RadarApp/>
        }} />} */}
        <Route path='/admin' render={this.renderIfLogged(<AdminApp />)} />

        {/* {username && <Route path="/feedbacks" component={Admin} />} */}
        <Route path='/feedbacks' render={this.renderIfLogged(<FeedbacksApp />)} />
        {/* {username && <Route path="/feedbacks" render={()=>{
          <FeedbacksApp/>
        }} />} */}

        <Route path="/about" component={About} />
        {/* <Route path="/about" render={()=>{
          
        }} /> */}
        {/* <Route path='/:page/login' component={Login}/> */}
      </div >
    </Router >;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));