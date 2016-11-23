import React from 'react';
import PageHeader from '/imports/ui/components/header/pageHeader';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="page-main-content page-dashboard">
        <PageHeader header={'Dashboard'} subHeader={'all your today tasks'} hx={1} />
      </div>
    );
  }
}
