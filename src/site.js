require('./stylesheets/base.scss');
require('./images/logo.png');
require('./images/tech-radar-201611-landing-page-wide.png');
require('./images/tw-logo.png');
require('./images/favicon.ico');
require('./images/radar_legend.png');
require('./stylesheets/feedback.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Widget, addResponseMessage } from 'react-chat-widget';
import { CSVContent, plotRadar } from './util/factory';
import csvContent from './radar.csv';
import axios from 'axios';
import Rx from 'rxjs';

const POSTURL = '/api'

var blips = CSVContent(csvContent);

plotRadar('title', blips);


class App extends React.Component {
  handleNewUserMessage(newMessage) {
    axios.post(POSTURL + '/feedback', { msg: newMessage })
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