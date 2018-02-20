import React, { Component } from 'react';
import { Table, Container } from 'semantic-ui-react';
import axios from 'axios';

class FormUser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      feedbacks: []
    }
  }

  componentDidMount() {
    axios.get('/api/feedbacks-json')
      .then(({ data: feedbacks }) => {
        this.setState({ feedbacks })
      })
  }

  render() {
    const feedbacks = this.state.feedbacks;
    return <Container style={{ marginTop: '6em' }}>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>feedback</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {feedbacks.map((feedback, id) => (
            <Table.Row key={id}>
              <Table.Cell>{feedback}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>;
  }
}

export default FormUser;
