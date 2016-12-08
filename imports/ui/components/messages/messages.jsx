import React from 'react';

import { createMessage } from '/imports/api/messages/actions';

import MessagesList from './messages-list';
import MessageInput from './message-input';

export class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnMessageSubmit = this.handleOnMessageSubmit.bind(this);
  }

  handleOnMessageSubmit(message) {
    // TODO: EDIT THIS SHIT
    createMessage(
      this.props.target._id,
      'task',
      message
    );
  }

  render() {
    return (
      <div className="messages-container">
        <MessagesList messages={this.props.messages} />
        <MessageInput
          onSubmit={this.handleOnMessageSubmit}
          disabled={this.props.enableToWrite}
        />
      </div>
    );
  }
}

Messages.propTypes = {
  target: React.PropTypes.object,
  messages: React.PropTypes.array,
  enableToWrite: React.PropTypes.bool
};
