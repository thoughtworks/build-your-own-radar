require('./stylesheets/base.scss');
require('./images/tech-radar-201611-landing-page-wide.png');
require('./images/tw-logo.png');
require('./images/favicon.ico');
require('./images/radar_legend.png');
require('./stylesheets/feedback.scss');
require('./images/SQLI_logo.png');

import React from 'react';
import ReactDOM from 'react-dom';
import { Dropdown } from 'semantic-ui-react'
import { Widget, addResponseMessage } from 'react-chat-widget';
import { CSVContent, plotRadar, hideBlips } from './util/factory';
import filtering from './util/filtering';
import axios from 'axios';

const API = '/api';

axios.get(API + '/technologies/_csv_')
  .then(({ data }) => {
    var blips = CSVContent(data);
    plotRadar('Technology Radar - SQLi ISCM', blips);

    let stateOptions = filtering.getPoles(blips);

    ReactDOM.render(<FilterComponent
      options={stateOptions}
      onChange={function (e, { value:values }){
        // console.log(arguments);
        let indexes = filtering.filrerBy(blips, values);
        hideBlips(indexes);
      }}
    />, document.getElementById('filter'));
  });


class App extends React.Component {
  handleNewUserMessage(newMessage) {
    axios.post(API + '/feedback', { msg: newMessage })
      .then(({ data }) => {
        addResponseMessage(data);
      });
  }

  render() {
    return (
      <div className="App">
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
    options={options}
    onChange={onChange}
    />
);


ReactDOM.render(<App />, document.getElementById('wid'));