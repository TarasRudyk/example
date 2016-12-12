import React from 'react';


export default class NotificationItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { description, isReaded } = this.props.notification;
    const styleClass = `notification-item' ${isReaded ? '' : 'unread'}`;
    return (
      <div className="list-item">
        <div dangerouslySetInnerHTML={({ __html: description })} className={styleClass} />
      </div>
    );
  }
}

NotificationItem.propTypes = {
  notification: React.PropTypes.object
};
