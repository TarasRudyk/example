import React from 'react';

export default class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(event) {
    event.preventDefault();
    this.setState({
      value: event.target.value
    });
    const { onChange } = this.props;
    if (onChange) onChange(event.target.value);
  }

  handleOnSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
  }

  render() {
    return (
      <div className="message-input">
        <input onChange={this.handleOnChange} />
        <button onClick={this.handleOnSubmit}>Send</button>
      </div>
    );
  }
}

MessageInput.propTypes = {
  // initialData: React.PropTypes.string,
  onSubmit: React.PropTypes.func,
  onChange: React.PropTypes.func
  // users: React.PropTypes.array
};
