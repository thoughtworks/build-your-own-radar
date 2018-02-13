import React, { Component } from 'react';
import { Container, Input, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import io from 'socket.io-client';

import TableUser from '../TableUser/TableUser';
import ModalUser from '../ModalUser/ModalUser';

import logo from '../../SQLI_logo.png';
// import shirts from '../../shirts.png';
import './App.css';

const appHeaderStyles = {
  'font-size': '18px'
};

const options = [
  { key: 'name', text: 'name', value: 'name' },
  { key: 'pole', text: 'techno', value: 'pole' },
  { key: 'ring', text: 'ring', value: 'ring' },
  { key: 'quadrant', text: 'quadrant', value: 'quadrant' },
]

class App extends Component {

  constructor() {
    super();

    this.server = process.env.REACT_APP_API_URL || '';
    this.socket = io.connect(this.server);

    this.state = {
      technologies: [],
      online: 0,
      filtertext: '',
      filterfield: options[0].key
    }

    this.fetchTechnologies = this.fetchTechnologies.bind(this);
    this.handleUserAdded = this.handleUserAdded.bind(this);
    this.handleUserUpdated = this.handleUserUpdated.bind(this);
    this.handleUserDeleted = this.handleUserDeleted.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  filterEntries(){
    let filteredTechnologies =
      this.state.allTechnologies.filter((technology) => {
        return (technology[this.state.filterfield] || '')
          .toLowerCase()
          .indexOf(this.state.filtertext.toLowerCase()) !== -1;
      });
    this.setState({
      technologies: filteredTechnologies
    });
  }

  handleFilterChange(e, targ) {
    // todo: refactor
    let name = targ.name,
        value = targ.value;
    this.setState({
      [name]: value
    }, this.filterEntries.bind(this));
  }
  // Place socket.io code inside here
  componentDidMount() {
    this.fetchTechnologies();
    this.socket.on('visitor enters', data => this.setState({ online: data }));
    this.socket.on('visitor exits', data => this.setState({ online: data }));
    this.socket.on('add', data => this.handleUserAdded(data));
    this.socket.on('update', data => this.handleUserUpdated(data));
    this.socket.on('delete', data => this.handleUserDeleted(data));
  }

  // Fetch data from the back-end
  fetchTechnologies() {
    axios.get(`${this.server}/api/technologies/`)
      .then((response) => {
        this.setState({
          allTechnologies: response.data
        });
        this.filterEntries();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleUserAdded(technology) {
    let technologies = this.state.technologies.slice();
    technologies.push(technology);
    this.setState({ technologies: technologies });
  }

  handleUserUpdated(technology) {
    let technologies = this.state.technologies.slice();
    for (let i = 0, n = technologies.length; i < n; i++) {
      if (technologies[i]._id === technology._id) {
        technologies[i].name = technology.name;
        technologies[i].ring = technology.ring;
        technologies[i].quadrant = technology.quadrant;
        technologies[i].pole = technology.pole;
        technologies[i].isNew = technology.isNew;
        technologies[i].description = technology.description;
        break; // Stop this loop, we found it!
      }
    }
    this.setState({ technologies });
  }

  handleUserDeleted(user) {
    let technologies = this.state.technologies.slice();
    technologies = technologies.filter(u => { return u._id !== user._id; });
    this.setState({ technologies: technologies });
  }

  render() {

    // let online = this.state.online;
    // let verb = (online <= 1) ? 'is' : 'are'; // linking verb, if you'd prefer
    // let noun = (online <= 1) ? 'person' : 'people';

    return (
      <div>
        <div className='App'>
          <div style={appHeaderStyles} className='App-header'>
            <img src={logo} className="sqli-logo" />
            <p>
              Technology Radar - Entries
            </p>
          </div>
        </div>
        <Container>
          <Input
            value={this.state.filtertext}
            name='filtertext'
            label={
              <Dropdown
                name='filterfield'
                value={this.state.filterfield}
                onChange={this.handleFilterChange}
                defaultValue={options[0].key}
                options={options}
              />
            }
            labelPosition='right'
            placeholder='Filter ...'
            onChange={this.handleFilterChange}
          />
          <ModalUser
            headerTitle='Add Technology'
            buttonTriggerTitle='Add New'
            buttonSubmitTitle='Add'
            buttonColor='green'
            onUserAdded={this.handleUserAdded}
            server={this.server}
            socket={this.socket}
          />
          {/* <em id='online'>{`${online} ${noun} ${verb} online.`}</em> */}
          <TableUser
            onUserUpdated={this.handleUserUpdated}
            onUserDeleted={this.handleUserDeleted}
            technologies={this.state.technologies}
            server={this.server}
            socket={this.socket}
          />
        </Container>
        <br />
      </div>
    );
  }
}

export default App;
