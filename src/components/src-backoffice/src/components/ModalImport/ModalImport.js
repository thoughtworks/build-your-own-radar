import React, { Component } from 'react';
import { Button, Modal, Form, TextArea, Icon} from 'semantic-ui-react';

import FormUser from '../FormUser/FormUser';

const addNewButton = {
  'float': 'right',
  'margin': '4px'
};

class ModalImport extends Component {
  componentWillMount() {
    this.setState({
      file: '',
      fileBlob: null,
      overwrite: true,
      loaging: false
    });
  }

  handleInputChange = (e, targ) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : (target.value || targ.value);
    const name = (target.name || targ.name);
    if (targ.type === 'file') {
      this.setState({
        fileBlob: e.target.files[0]
      })
    }
    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    this.setState({
      loading: true
    }, () => {
      this.props.handleSubmit({
        fileBlob: this.state.fileBlob,
        overwrite: this.state.overwrite
      }).finally(() => {
        this.setState({ loading: false });
      });
    })
  }

  render() {
    return (
      <Modal
        closeIcon
        trigger={
          <Button style={addNewButton} secondary color={this.props.buttonColor}>
            <Icon name='upload' />{this.props.buttonTriggerTitle}
          </Button>
        }
        dimmer='inverted'
        size='tiny'
        closeIcon='close'
      >
        <Modal.Header>{this.props.headerTitle}</Modal.Header>
        <Modal.Content>
          <Form loading={this.state.loading} onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Input
                label='File'
                type='file'
                placeholder='Technology ...'
                name='file'
                required
                value={this.state.name}
                onChange={this.handleInputChange}
              />
              <Form.Input
                label='Overwrite'
                type='checkbox'
                // placeholder=''
                name='overwrite'
                disabled
                checked={this.state.overwrite}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            {/* <Message
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
            /> */}
            <Button color={this.props.buttonColor} floated='right'>{this.props.buttonSubmitTitle}</Button>
            <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalImport;
