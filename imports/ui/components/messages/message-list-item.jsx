import React from 'react';

export default class MessageListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { content, createdAt } = this.props.item;
    return (
      <div className="message-list-item">
        <div>{content}</div>
        <date>{createdAt.toString()}</date>
      </div>
    );
  }
}

MessageListItem.propTypes = {
  item: React.PropTypes.object
};
