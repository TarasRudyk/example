import React from 'react';


export default class NotificationItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { description } = this.props.notification;

    return (
      <div className="list-item">
        <div className="notification-item">
          {description}
        </div>
      </div>
    );
  }
}

NotificationItem.propTypes = {
  notification: React.PropTypes.object
};
