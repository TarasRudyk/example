import React from 'react';
import PageHeader from '/imports/ui/components/header/pageHeader';


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const content = {
      header: 'Dashboard',
      subHeader: 'all your today tasks'
    };
    return (
      <div className="page-main-content page-dashboard">
        <PageHeader content={content} />
      </div>
    );
  }
}
