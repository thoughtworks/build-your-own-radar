import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Input, Dropdown, Menu, Image } from 'semantic-ui-react';

import logo from '../../SQLI_logo.png';
import Axios from 'axios';


class About extends Component {
  componentWillMount(){
    this.setState({
      aboutContent: {__html : ''}
    });
  }
  componentDidMount(){
    Axios.get('/api/about-content')
      .then( ({data}) => {
        this.setState({
          aboutContent: {__html: data}
        });
      });
  }
  render(){
    return <div style={{marginTop:'100px'}} dangerouslySetInnerHTML={this.state.aboutContent}></div>;
  }
}

module.exports = About;