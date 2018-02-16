require('./stylesheets/base.scss');
require('./images/tech-radar-201611-landing-page-wide.png');
require('./images/tw-logo.png');
require('./images/favicon.ico');
require('./images/radar_legend.png');
require('./stylesheets/feedback.scss');
require('./images/SQLI_logo.png');

import React from 'react';
import ReactDOM from 'react-dom';
import Feed, { Dropdown } from 'semantic-ui-react'
import { Widget, addResponseMessage } from 'react-chat-widget';
import { CSVContent, plotRadar, hideBlips } from './util/factory';
import filtering from './util/filtering';
import axios from 'axios';
import Radar from './Radar';

const API = '/api';




class Feedbacks extends React.Component {
  handleNewUserMessage(newMessage) {
    axios.post(API + '/feedback', { msg: newMessage })
      .then(({ data }) => {
        addResponseMessage(data);
      });
  }

  render() {
    return (
      <div className="feedbacks">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          title="Feedback"
          subtitle="your feedback might be helpful"
          showCloseButton
        />
      </div>
    );
  }
}
const FilterComponent = ({ options, onChange }) => (
  <Dropdown placeholder='Filters ...' fluid multiple search selection
    defaultOpen={true}
    options={options}
    onChange={onChange}
  />
);


// ReactDOM.render(<Feedbacks />, document.getElementById('wid'));


class RadarContent extends React.Component {
  constructor() {
    this.state = {
      categories: [],
      stateOptions: []
    }
  }
  componentDidMount() {
    axios.get(API + '/technologies/_csv_')
      .then(({ data }) => {
        var blipsO = CSVContent(data);
        var blips = plotRadar('Technology Radar - SQLi ISCM', blipsO);

        let stateOptions = filtering.getPoles(blips);

        this.setState({stateOptions});

        ReactDOM.render(<FilterComponent
          options={stateOptions}
          onChange={function (e, { value: values }) {
            // console.log(arguments);
            let indexes = filtering.filrerBy(blips, values);
            hideBlips(indexes);
          }}
        />, document.getElementById('filter'));
      });
  }
  render() {
    return <div className="wid">
      <Feedbacks />
      <Header categories={this.state.categories} />
      <Radar stateOptions={this.state.stateOptions} />
    </div>
  }
}
