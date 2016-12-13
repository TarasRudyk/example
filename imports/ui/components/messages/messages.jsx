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
    const { target, targetType, mentionNotification } = this.props;
    createMessage(
      target._id,
      targetType,
      message.content,
      mentionNotification,
      message.mentionUsers
    );
  }

  render() {
    const { enableToWrite, mentions } = this.props;
    return (
      <div className="messages-container">
        <MessagesList messages={this.props.messages} />
        <MessageInput
          onSubmit={this.handleOnMessageSubmit}
          disabled={enableToWrite}
          mentions={mentions}
        />
      </div>
    );
  }
}

Messages.propTypes = {
  mentionNotification: React.PropTypes.string,
  targetType: React.PropTypes.string,
  target: React.PropTypes.object,
  messages: React.PropTypes.array,
  mentions: React.PropTypes.object,
  enableToWrite: React.PropTypes.bool
};
