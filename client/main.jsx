import { Meteor } from 'meteor/meteor';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { TAPi18n } from 'meteor/tap:i18n';

class Karma extends Component {
  render() {
    return (
      <div>{TAPi18n.__('karma')}</div>
    );
  }
}

Meteor.startup(() => {
  ReactDOM.render(<Karma />, document.getElementById('app'));
});
