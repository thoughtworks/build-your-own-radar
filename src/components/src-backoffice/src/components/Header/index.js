import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Input, Dropdown, Menu, Image } from 'semantic-ui-react';

import logo from '../../SQLI_logo.png';

module.exports = () => {
    return <Menu fixed='top'>
    <Container style={{fontSize:"130%"}}>
      <Menu.Item as={Link} to='/' header style={{flexDirection:'row'}}>
        <Image
          size='tiny'
          src={logo}
          style={{ marginRight: '1.5em' }}
        />
        Technologies Radar
      </Menu.Item>
      <Menu.Item as={Link} to='/admin'>Admin</Menu.Item>
      {/* todom: make it visible to looged users */}
      <Menu.Item as={Link} to='/feedbacks'>Feedbacks</Menu.Item>
      <Menu.Item as={Link} to='/about'>About</Menu.Item>
    </Container>
  </Menu>
}