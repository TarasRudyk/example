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
    createMessage(
      this.props.taskId,
      'task',
      message
    );
  }

  render() {
    return (
      <div className="messages-container">
        <MessagesList messages={this.props.messages} />
        <MessageInput onSubmit={this.handleOnMessageSubmit} />
      </div>
    );
  }
}

Messages.propTypes = {
  taskId: React.PropTypes.string,
  messages: React.PropTypes.array
};
