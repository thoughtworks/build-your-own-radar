import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Input, Dropdown, Menu, Image } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import logo from '../../SQLI_logo.png';

const MenuItemWithActiveState = withRouter((props) => {
  const pathname = props.location.pathname;
  const to = props.to;
  return <Menu.Item active={to === pathname} {...props} />;
});

class Header extends Component {
  render() {

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
        <MenuItemWithActiveState as={Link} to='/admin'>Admin</MenuItemWithActiveState>
        <MenuItemWithActiveState as={Link} to='/feedbacks'>Feedbacks</MenuItemWithActiveState>
        <MenuItemWithActiveState as={Link} to='/about'>About</MenuItemWithActiveState>
      </Container>
    </Menu>
  }
}

module.exports = Header;