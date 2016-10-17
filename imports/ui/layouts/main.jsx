import React from 'react';

import Header from '/imports/ui/components/header';

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="the-karma">
        {this.props.userIsLogin ? <Header /> : ''}
        {this.props.content}
      </div>
    );
  }
}

MainLayout.propTypes = {
  content: React.PropTypes.element,
  userIsLogin: React.PropTypes.bool
};
