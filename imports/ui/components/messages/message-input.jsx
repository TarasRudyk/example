import React from 'react';

export default class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>Message input</div>
        <input />
        <button>Send</button>
      </div>
    );
  }
}

MessageInput.propTypes = {
  initialData: React.PropTypes.string,
  onSubmit: React.PropTypes.func,
  onChange: React.PropTypes.func,
  users: React.PropTypes.array
};
