import React from 'react';

export default class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { children, small, rounded, bordered, color, disabled, submit } = this.props;
    const buttonType = submit ? 'submit' : 'button';
    const buttonClass = ['button'];

    if (small) {
      buttonClass.push('small');
    }

    if (rounded) {
      buttonClass.push('rounded');
    }

    if (bordered) {
      buttonClass.push('bordered');
    }

    if (color) {
      buttonClass.push(color);
    }

    return (
      <button type={buttonType} className={buttonClass.join(' ')} disabled={disabled}>
        {children || ''}
      </button>
    );
  }
}

Button.propTypes = {
  children: React.PropTypes.string,
  small: React.PropTypes.bool,
  rounded: React.PropTypes.bool,
  bordered: React.PropTypes.bool,
  color: React.PropTypes.oneOf(['green', 'blue', 'red']),
  disabled: React.PropTypes.bool,
  submit: React.PropTypes.bool
};
