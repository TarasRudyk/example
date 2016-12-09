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
    const { target, targetType } = this.props;
    createMessage(
      target._id,
      targetType,
      message.content,
      message.mentionUsers
    );
  }

  render() {
    return (
      <div className="messages-container">
        <MessagesList messages={this.props.messages} />
        <MessageInput
          onSubmit={this.handleOnMessageSubmit}
          disabled={this.props.enableToWrite}
          mentions={this.props.mentions}
        />
      </div>
    );
  }
}

Messages.propTypes = {
  targetType: React.PropTypes.string,
  target: React.PropTypes.object,
  messages: React.PropTypes.array,
  mentions: React.PropTypes.object,
  enableToWrite: React.PropTypes.bool
};
