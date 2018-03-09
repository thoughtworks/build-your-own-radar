
import { Widget, addResponseMessage } from 'react-chat-widget';
import React from 'react';
import axios from 'axios';

class Feedbacks extends React.Component {
    handleNewUserMessage(newMessage) {
      axios.post('/api/feedback', { msg: newMessage })
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

  module.exports = Feedbacks;