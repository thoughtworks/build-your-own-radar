import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Input, Dropdown, Menu, Image } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import logo from '../../SQLI_logo.png';

const WithRouteState = (props) => {
  const pathname = props.location.pathname;
  const to = props.to;
  return <Menu.Item active={to === pathname} {...props} />;
}

class Header extends Component {
  render() {
    const location = this.props.location;

    return <Menu fixed='top'>
      <Container style={{ fontSize: "130%" }}>
        <WithRouteState location={location} as={Link} to='/' header style={{ flexDirection: 'row' }}>
          <Image
            size='tiny'
            src={logo}
            style={{ marginRight: '1.5em' }}
          />
          Technologies Radar
        </WithRouteState>
        <WithRouteState location={location} as={Link} to='/admin'>Admin</WithRouteState>
        <WithRouteState location={location} as={Link} to='/feedbacks'>Feedbacks</WithRouteState>
        <WithRouteState location={location} as={Link} to='/about'>About</WithRouteState>
      </Container>
    </Menu>
  }
}

module.exports = withRouter(Header);