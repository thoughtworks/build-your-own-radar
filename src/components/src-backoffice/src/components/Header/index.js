import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Input, Dropdown, Menu, Image } from 'semantic-ui-react';
import { withRouter, Route } from 'react-router-dom';
import LoginLogout from '../LoginLogout';

import logo from '../../SQLI_logo.png';

const MenuItemWithActiveState = withRouter((props) => {
  // debugger;
  if(props.staticContext){
    delete props.staticContext;
  }
  const pathname = props.location.pathname;
  const to = props.to;
  return <Menu.Item active={to === pathname} {...props}/>;
  // {props.children} </Menu.Item>;
});

class Header extends Component {
  componentWillMount(){
    this.setState({
      username: null
    })
  }

  onLogin = (username)=>{
    this.setState({
      username
    });
  };
  
  onLogout = ()=>{
    this.setState({
      username: null
    });
  };
  
  render() {
    const adminAreaVisible = !! this.state.username;
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
        <LoginLogout onLogin={this.onLogin} onLogout={this.onLogout} username={this.state.username} />
      </Container>
    </Menu>
  }
}

module.exports = Header;