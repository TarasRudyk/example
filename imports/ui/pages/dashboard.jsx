import React from 'react';
import Header from '/imports/ui/components/header/mainHeader';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const content = {
      header: 'Dashboard',
      subHeader: 'all your today tasks',
      rightSide: false
    };
    return (
      <div className="page-main-content page-dashboard">
        <Header content={content} />
      </div>
    );
  }
}
