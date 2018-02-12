import React, { Component } from 'react';
import { Message, Button, Form, TextArea } from 'semantic-ui-react';
import axios from 'axios';

// const genderOptions = [
//   { key: 'm', text: 'Male', value: 'm' },
//   { key: 'f', text: 'Female', value: 'f' },
//   { key: 'o', text: 'Do Not Disclose', value: 'o' }
// ]

class FormUser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      ring: '',
      pole: '',
      quadrant: '',
      isNew: '',
      description: '',
      formClassName: '',
      formSuccessMessage: '',
      formErrorMessage: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // Fill in the form with the appropriate data if user id is provided
    if (this.props.userID) {
      axios.get(`${this.props.server}/api/technologies/${this.props.userID}`)
        .then((response) => {
          this.setState({
            name: response.data.name,
            ring: response.data.ring,
            pole: response.data.pole,
            quadrant: response.data.quadrant,
            isNew: response.data.isNew,
            description: response.data.description,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSelectChange(e, data) {
    this.setState({ isNew: data.value });
  }

  handleSubmit(e) {
    // Prevent browser refresh
    e.preventDefault();

    const user = {
      name: this.state.name,
      ring: this.state.ring,
      pole: this.state.pole,
      quadrant: this.state.quadrant,
      isNew: this.state.isNew || false,
      description: this.state.description
    }

    // Acknowledge that if the user id is provided, we're updating via PUT
    // Otherwise, we're creating a new data via POST
    const method = this.props.userID ? 'put' : 'post';
    const params = this.props.userID ? this.props.userID : '';

    axios({
      method: method,
      responseType: 'json',
      url: `${this.props.server}/api/technologies/${params}`,
      data: user
    })
      .then((response) => {
        this.setState({
          formClassName: 'success',
          formSuccessMessage: response.data.msg
        });

        if (!this.props.userID) {
          this.setState({
            name: '',
            ring: '',
            pole: '',
            quadrant: '',
            isNew: '',
            description: ''
          });
          this.props.onUserAdded(response.data.result);
          this.props.socket.emit('add', response.data.result);
        }
        else {
          this.props.onUserUpdated(response.data.result);
          this.props.socket.emit('update', response.data.result);
        }

      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data) {
            this.setState({
              formClassName: 'warning',
              formErrorMessage: err.response.data.msg
            });
          }
        }
        else {
          this.setState({
            formClassName: 'warning',
            formErrorMessage: 'Something went wrong. ' + err
          });
        }
      });
  }

  render() {

    const formClassName = this.state.formClassName;
    const formSuccessMessage = this.state.formSuccessMessage;
    const formErrorMessage = this.state.formErrorMessage;

    return (
      <Form className={formClassName} onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            label='Name'
            type='text'
            placeholder='Technology ...'
            name='name'
            maxLength='40'
            required
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <Form.Input
            label='Ring'
            type='text'
            placeholder='adopt, trial, assess or hold'
            name='ring'
            maxLength='40'
            required
            value={this.state.ring}
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Form.Group widths='even'>
          <Form.Input
            label='Quadrant'
            type='text'
            placeholder='Type of technology'
            name='quadrant'
            value={this.state.quadrant}
            onChange={this.handleInputChange}
          />
          <Form.Input
            label='Techno'
            type='text'
            placeholder=''
            name='pole'
            maxLength='40'
            required
            value={this.state.pole}
            onChange={this.handleInputChange}
          />
          <Form.Input
            label='Is new ?'
            type='checkbox'
            placeholder='true / false'
            name='isNew'
            checked={this.state.isNew}
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <TextArea
          value={this.state.description}
          autoHeight
          name='description'
          placeholder='Technologie description ...'
          onChange={this.handleInputChange}
        />
        <Message
          success
          color='green'
          header='Nice one!'
          content={formSuccessMessage}
        />
        <Message
          warning
          color='yellow'
          header='Woah!'
          content={formErrorMessage}
        />
        <Button color={this.props.buttonColor} floated='right'>{this.props.buttonSubmitTitle}</Button>
        <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
      </Form>
    );
  }
}

export default FormUser;
