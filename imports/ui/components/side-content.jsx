import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.getClass = this.getClass.bind(this);
  }
  getClass() {
    return this.props.show ? 'page-side-content active' : 'page-side-content';
  }
  render() {
    return (
      <div className={this.getClass()}>
        Side content
      </div>
    );
  }
}

Header.propTypes = {
  show: React.PropTypes.bool
};
