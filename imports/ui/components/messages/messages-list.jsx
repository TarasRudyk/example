import React from 'react';

import MessageListItem from './message-list-item';

export default class MessagesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { messages } = this.props;
    const listContent = messages.length > 0 ? messages.map(m =>
      <MessageListItem key={m._id} item={m} />
    ) : (<div>Nothik here</div>);
    return (
      <div>
        <div>Messages list</div>
        {listContent}
      </div>
    );
  }
}

MessagesList.propTypes = {
  messages: React.PropTypes.array
};
