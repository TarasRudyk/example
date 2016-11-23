import React from 'react';

export default class pageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { header, subHeader, children, hx } = this.props;
    let leftBlock;
    switch (hx) {
      case 1:
        leftBlock = <h1>{header}{subHeader ? <span>{subHeader}</span> : null}</h1>;
        break;
      case 2:
        leftBlock = <h2>{header}{subHeader ? <span>{subHeader}</span> : null}</h2>;
        break;
      case 3:
        leftBlock = <h3>{header}{subHeader ? <span>{subHeader}</span> : null}</h3>;
        break;
      case 4:
        leftBlock = <h4>{header}{subHeader ? <span>{subHeader}</span> : null}</h4>;
        break;
      case 5:
        leftBlock = <h5>{header}{subHeader ? <span>{subHeader}</span> : null}</h5>;
        break;
      case 6:
        leftBlock = <h6>{header}{subHeader ? <span>{subHeader}</span> : null}</h6>;
        break;
      default:
        leftBlock = <h1>{header}{subHeader ? <span>{subHeader}</span> : null}</h1>;
    }
    return (
      <div className="separator">
        <div className="container limit">
          <div className="title">
            {leftBlock}
            <div className="title-right-block">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

pageHeader.propTypes = {
  children: React.PropTypes.object,
  header: React.PropTypes.string,
  subHeader: React.PropTypes.string,
  hx: React.PropTypes.number
};
