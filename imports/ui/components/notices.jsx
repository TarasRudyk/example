import React from 'react';
import { NotificationStack } from 'react-notification';
import { OrderedSet } from 'immutable';

export default class Notices extends React.Component {
  constructor() {
    super();

    this.state = {
      notices: OrderedSet()
    };

    this.addNotice = this.addNotice.bind(this);
    this.removeNotice = this.removeNotice.bind(this);
  }
  componentWillReceiveProps() {
    const { notices } = this.props;

    if (!notices || !notices.length) return;

    let i = 0;
    const push = () => {
      this.addNotice(notices[i]);

      i += 1;

      if (i < notices.length) {
        setTimeout(push, 500);
      }
    };

    push();
  }
  addNotice(notice) {
    const { notices } = this.state;
    const { text, id } = notice;

    return this.setState({
      notices: notices.add({
        message: text,
        key: id,
        dismissAfter: 4000,
        onClick: () => this.removeNotice(id)
      })
    });
  }

  removeNotice(id) {
    const { notices } = this.state;
    this.setState({
      notices: notices.filter(n => n.key !== id)
    });
  }

  render() {
    return (
      <div className="notices">
        <NotificationStack
          notifications={this.state.notices.toArray()}
          onDismiss={notice => this.setState({
            notices: this.state.notices.delete(notice)
          })}
        />
      </div>
    );
  }
}

Notices.propTypes = {
  notices: React.PropTypes.array
};
