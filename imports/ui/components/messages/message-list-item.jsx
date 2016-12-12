import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class MessageListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.toMessageHtml = this.toMessageHtml.bind(this);
  }

  toMessageHtml(content) {
    const { blocks, entityMap } = content;
    let html = '';
    blocks.forEach((block) => {
      let blockHtml = block.text;
      block.entityRanges.forEach(({ key }) => {
        const mentionData = entityMap[key].data.mention._root.entries;
        const link = mentionData[1][1];
        const name = mentionData[0][1];
        blockHtml = blockHtml.replace(new RegExp(`${name}(?!\\s</a>)`, 'g'),
        `<a href="${link}">${name} </a>`);
      });
      html += `<p>${blockHtml}</p>`;
    });
    return html;
  }
  render() {
    const { _id, content, createdAt, author } = this.props.item;
    const html = this.toMessageHtml(content);
    const authorClass = author && (Meteor.userId() === author.id) ? ' author' : '';
    return (
      <div id={_id} className={`message-list-item${authorClass}`}>
        <img src={author.avatar} alt={author.fullname} />
        <div className="message-data">
          <span>{author.fullname}</span>
          <div dangerouslySetInnerHTML={({ __html: html })} />
          <date>{createdAt.toString()}</date>
        </div>
      </div>
    );
  }
}

MessageListItem.propTypes = {
  item: React.PropTypes.object
};
