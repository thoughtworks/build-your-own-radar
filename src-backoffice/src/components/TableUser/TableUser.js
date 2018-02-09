import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import ModalUser from '../ModalUser/ModalUser';
import ModalConfirmDelete from '../ModalConfirmDelete/ModalConfirmDelete';

class TableUser extends Component {

  render() {

    let technologies = this.props.technologies;

    technologies = technologies.map((user) => 
      <Table.Row key={user._id}>
        <Table.Cell>{user.name}</Table.Cell>
        <Table.Cell>{user.pole}</Table.Cell>
        <Table.Cell>{user.ring}</Table.Cell>
        <Table.Cell>{user.quadrant}</Table.Cell>
        <Table.Cell>{String(user.isNew)}</Table.Cell>
        {/* <Table.Cell>{user.description}</Table.Cell> */}
        <Table.Cell>
          <ModalUser
            headerTitle='Edit User'
            buttonTriggerTitle='Edit'
            buttonSubmitTitle='Save'
            buttonColor='blue'
            userID={user._id}
            onUserUpdated={this.props.onUserUpdated}
            server={this.props.server}
            socket={this.props.socket}
          />
          <ModalConfirmDelete
            headerTitle='Delete User'
            buttonTriggerTitle='Delete'
            buttonColor='black'
            user={user}
            onUserDeleted={this.props.onUserDeleted}
            server={this.props.server}
            socket={this.props.socket}
          />
        </Table.Cell>
      </Table.Row>
    );

    // Make every new user appear on top of the list
    technologies =  [...technologies].reverse();

    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>name</Table.HeaderCell>
            <Table.HeaderCell>techno</Table.HeaderCell>
            <Table.HeaderCell>ring</Table.HeaderCell>
            <Table.HeaderCell>quadrant</Table.HeaderCell>
            <Table.HeaderCell>isNew</Table.HeaderCell>
            {/* <Table.HeaderCell>description</Table.HeaderCell> */}
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {technologies}
        </Table.Body>
      </Table>
    );
  }
}

export default TableUser;
