import React from 'react';

export default class pageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { content } = this.props;
    return (
      <div className="separator">
        <div className="container">
          <div className="title">
            <h1>{content.header}<span>{content.subHeader}</span></h1>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

pageHeader.propTypes = {
  children: React.PropTypes.object,
  content: React.PropTypes.object
};
