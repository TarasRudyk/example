import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

import MessageListItem from './message-list-item';

export default class MessagesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const scrollTo = FlowRouter.current().context.hash;
    if (scrollTo) {
      const messageElement = document.querySelector(`#${scrollTo}`); // eslint-disable-line
      if (messageElement) {
        messageElement.scrollIntoView();
      }
    }

    const messages = this.props.messages || [];
    const listContent = messages.length > 0 ? messages.map(m =>
      <MessageListItem key={m._id} item={m} />
    ) : (<div>Nothik here</div>);
    return (
      <div className="messages-list">
        {listContent}
      </div>
    );
  }
}

MessagesList.propTypes = {
  messages: React.PropTypes.array
};
