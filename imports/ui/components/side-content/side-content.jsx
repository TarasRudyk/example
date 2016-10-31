import React from 'react';

import SideNotifications from '/imports/ui/containers/components/side-content/side-notifications';
import LoadingComponent from '/imports/ui/components/loading.jsx';

export default class Header extends React.Component {
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
        return <SideNotifications />;
      default:
        return <LoadingComponent />;
    }
  }
  render() {
    return (
      <div className={this.getClass()}>
        <div className="separator">
          <div className="container">
            {this.getContent(this.props.name)}
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  show: React.PropTypes.bool,
  name: React.PropTypes.string
};
