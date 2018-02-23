import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Input, Dropdown, Menu, Image } from 'semantic-ui-react';
import { withRouter, Route } from 'react-router-dom';
import LoginLogout from '../LoginLogout';
import axios from 'axios';
import logo from '../../SQLI_logo.png';
import cookie from 'cookie-machine';
import jwtDecode from 'jwt-decode';

const MenuItemWithActiveState = withRouter((props) => {
  const pathname = props.location.pathname;
  const to = props.to;
  return <Menu.Item active={to === pathname} {...props} />;
});

const HEADERKEY = 'x-access-token';

class Header extends Component {
  constructor() {
    super();

    axios.interceptors.request.use(function (config) {
      const token = cookie.get(HEADERKEY);
      debugger;
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
    this.setState({
      username: null,
      loading: false
    })
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
          debugger;
          this.setState({
            loading: false,
            username
          });
        }
      })
        .catch(() => {
          cookie.remove(HEADERKEY);
          debugger;
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
    const adminAreaVisible = !!this.state.username;

    return <Menu fixed='top'>
      <Container style={{ fontSize: "130%" }}>
        <MenuItemWithActiveState as={Link} to='/' header style={{ flexDirection: 'row' }}>
          <Image
            size='tiny'
            src={logo}
            style={{ marginRight: '1.5em' }}
          />
          Technologies Radar
        </MenuItemWithActiveState>
        {adminAreaVisible && <MenuItemWithActiveState as={Link} to='/admin'>Admin</MenuItemWithActiveState>}
        {adminAreaVisible && <MenuItemWithActiveState as={Link} to='/feedbacks'>Feedbacks</MenuItemWithActiveState>}
        <MenuItemWithActiveState as={Link} to='/about'>About</MenuItemWithActiveState>
        <LoginLogout
          loading={this.state.loading}
          onLogin={this.onLogin}
          onLogout={this.onLogout}
          username={this.state.username}
        />
      </Container>
    </Menu>
  }
}

module.exports = Header;