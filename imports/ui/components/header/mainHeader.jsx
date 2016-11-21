import React from 'react';

import { deleteProject } from '/imports/api/projects/actions.js';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  deleteHandler(e) {
    const id = e.target.value;
    const conf = confirm('Are you sure?'); // eslint-disable-line
    if (conf) {
      deleteProject(id);
    }
  }
  render() {
    const { content } = this.props;
    let rightSide = null;
    switch (content.rightSide.name) {
      case 'Projects':
        rightSide = (
          <div className="title-right-block">
            <a href="/project/create" className="button green">New project</a>
          </div>
        );
        break;
      case 'SingleProject':
        rightSide = (
          content.rightSide.isOwner ?
            <div className="title-right-block">
              <a href={`/project/edit/${content.rightSide.project._id}`} className="button green">Edit</a>
              <button className="button red" value={content.rightSide.project._id} onClick={this.deleteHandler}>Remove</button>
            </div> : null
        );
        break;
      default:
        rightSide = null;
    }

    return (
      <div className="separator">
        <div className="container">
          <div className="title">
            <h1>{content.header}<span>{content.subHeader}</span></h1>
            {rightSide}
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  content: React.PropTypes.object
};
