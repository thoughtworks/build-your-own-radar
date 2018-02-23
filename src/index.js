import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/src-backoffice/src/components/Header'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import Login from './components/src-backoffice/src/components/Login';
// import React from 'react';

import axios from 'axios';
import cookie from 'cookie-machine';
import jwtDecode from 'jwt-decode';
import Home from './components/radar/index';
import Admin from './components/src-backoffice/src/index';


const HEADERKEY = 'x-access-token';

class App extends Component {
  constructor(){
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

  componentWillMount(){
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

  onLogin = ({ username, password }) => {
    this.setState({
      loading: true
    }, () => {
      axios.post(this.server + '/api/login', {
        username,
        password
      }).then(({data, status}) => {
        if(status === 200){
          cookie.set(HEADERKEY, data.token);
          let {username} = jwtDecode(data.token);
          
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

  onLogout = () => {
    this.setState({
      loading: true
    }, () => {
      axios.get(this.server + '/api/logout', {
        auth: {
          username: '',
          password: ''
        }
      }).finally(() => {
        this.setState({
          username: null,
          loading: false
        });
      });
    });
  };

  render() {
    const {username, loading} = this.state;
    const {onLogin, onLogout} = this;

    return <Router>
      < div >
        <Header {...username} {...loading} {...onLogin} {...onLogout} />
        <Route exact path="/" component={Home} />
        {username && <Route path="/admin" component={Admin} />}
        {username && <Route path="/feedbacks" component={Admin} />}
        <Route path="/about" component={Admin} />
        {/* <Route path='/:page/login' component={Login}/> */}
      </div >
    </Router >;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));