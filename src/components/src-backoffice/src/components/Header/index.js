import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Input, Dropdown, Menu, Image } from 'semantic-ui-react';
import { withRouter, Route } from 'react-router-dom';
import LoginLogout from '../LoginLogout';
import logo from '../../SQLI_logo.png';

const MenuItemWithActiveState = withRouter((props) => {
  const pathname = props.location.pathname;
  const to = props.to;
  return <Menu.Item active={to === pathname} {...props} />;
});

class Header extends Component {

  render() {
    const {username, loading, login, logout} = this.props;

    const adminAreaVisible = !!username;

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
          loading={loading}
          login={login}
          logout={logout}
          username={username}
        />
      </Container>
    </Menu>
  }
}

module.exports = Header;