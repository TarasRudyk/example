import React from 'react';

import MessageListItem from './message-list-item';

export default class MessagesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>Messages list</div>
        <MessageListItem />
        <MessageListItem />
      </div>
    );
  }
}

MessagesList.propTypes = {};
