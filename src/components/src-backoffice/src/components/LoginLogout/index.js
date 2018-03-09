import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Modal, Button, Form, Grid, Header, Image, Message, Segment, Menu } from 'semantic-ui-react'

class LoginForm extends Component {
  componentWillMount() {
    this.setState({
      username: '',
      password: ''
    })
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  login = () => {
    this.props.login({
      username: this.state.username,
      password: this.state.password
    });
  };

  render() {
    return <div>
      <Modal.Header
        style={{
          // todo remove radar css
          backgroundColor: 'white',
          color: 'Black'
        }}
      >
        <Image
          size='tiny'
          src="/assets/images/brand_logo.png"
          style={{ margin: 'auto' }}
        />
        {' '}Log-in to your account
      </Modal.Header>
      <Modal.Content>
        <Header as='h2' textAlign='center'>
        </Header>
        <Form onSubmit={this.login} loading={this.props.loading} size='large'>
          <Segment stacked>
            <Form.Input
              onChange={this.handleChange}
              name='username'
              fluid
              icon='user'
              iconPosition='left'
              placeholder='User Name'
            />
            <Form.Input
              onChange={this.handleChange}
              name='password'
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
            <Button color='blue' fluid size='large'>Login</Button>
          </Segment>
        </Form>
      </Modal.Content>
    </div>;
  }
}


class LoginLogout extends Component {
  render() {
    const username = this.props.username;
    if (username) {
      return <Menu.Item
      onClick={this.props.logout}
      position='right'
    >{username + ', Logout'}</Menu.Item>;
    } else {
      return <Modal
        // onClose={this.onClose}
        size='tiny'
        trigger={<Menu.Item
          position='right'
        >Login</Menu.Item>}
      >
        <LoginForm {...this.props} />
      </Modal>
    }
  }
}

// LoginForm.prototype = {
//   loading: PropTypes.bool
// };

export default withRouter(LoginLogout);
