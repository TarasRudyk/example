import React from 'react';

import SideNotifications from '/imports/ui/containers/components/side-content/side-notifications';

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
    if (name === 'Notifications') {
      return <SideNotifications />;
    }
    return this.props.name;
  }
  render() {
    return (
      <div className={this.getClass()}>
        <div className="separator">
          <div className="container">
            <div className="title">
              <h3>{this.getContent(this.props.name)}</h3>
            </div>
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
