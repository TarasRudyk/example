import React from 'react';
import { Meteor } from 'meteor/meteor';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

export default class MessageListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { content, createdAt, author } = this.props.item;
    const html = stateToHTML(convertFromRaw(content));
    const authorClass = author && (Meteor.userId() === author.id) ? ' author' : '';

    return (
      <div className={`message-list-item${authorClass}`}>
        <div dangerouslySetInnerHTML={({ __html: html })} />
        <date>{createdAt.toString()}</date>
      </div>
    );
  }
}

MessageListItem.propTypes = {
  item: React.PropTypes.object
};
