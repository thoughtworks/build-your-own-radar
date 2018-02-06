require('./stylesheets/base.scss');
require('./images/tech-radar-201611-landing-page-wide.png');
require('./images/tw-logo.png');
require('./images/favicon.ico');
require('./images/radar_legend.png');
require('./stylesheets/feedback.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Widget, addResponseMessage } from 'react-chat-widget';
import { CSVContent, plotRadar } from './util/factory';
import axios from 'axios';

const API = '/api';

axios.get( API + '/technologies/_csv_' )
  .then(({ data }) => {
    var blips = CSVContent(data);
    plotRadar('Technology radar', blips);
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


ReactDOM.render(<App />, document.getElementById('wid'));