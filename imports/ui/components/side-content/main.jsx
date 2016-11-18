import React from 'react';

import Notifications from '/imports/ui/containers/components/side-content/notifications';
import Tasks from '/imports/ui/containers/components/side-content/tasks-list';
import Loading from '/imports/ui/components/side-content/loading';

export default class SideContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.getClass = this.getClass.bind(this);
    this.getContent = this.getContent.bind(this);
  }
  getClass() {
    return this.props.show ? 'page-side-content active' : 'page-side-content';
  }
  getContent(name) {
    switch (name) {
      case 'notifications':
        return <Notifications />;
      case 'tasks':
        return <Tasks />;
      default:
        return <Loading />;
    }
  }
  render() {
    return (
      <div className={this.getClass()}>
        {this.getContent(this.props.name)}
      </div>
    );
  }
}

SideContent.propTypes = {
  show: React.PropTypes.bool,
  name: React.PropTypes.string
};
