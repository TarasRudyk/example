import React from 'react';

export default class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange({ target }) {
    this.setState({
      value: target.value
    });
    this.props.callback({
      value: target.value,
      name: target.name
    });
  }
  render() {
    const { name, placeholder, error, type, autoFocus } = this.props;
    return (
      <div>
        <input
          className={error ? 'error' : ''}
          type={type || 'text'}
          name={name}
          placeholder={placeholder}
          value={this.state.value}
          autoFocus={autoFocus}
          onChange={this.handleChange}
        />
        <span className="field-error">{error}</span>
      </div>
    );
  }
}

InputField.propTypes = {
  name: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  type: React.PropTypes.string,
  error: React.PropTypes.string,
  autoFocus: React.PropTypes.bool,
  callback: React.PropTypes.func
};
