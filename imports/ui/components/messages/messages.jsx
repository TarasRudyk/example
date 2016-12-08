import React from 'react';

import MessagesList from './messages-list';
import MessageInput from './message-input';

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>Messages</div>
        <MessagesList />
        <MessageInput />
      </div>
    );
  }
}

Messages.propTypes = {};
