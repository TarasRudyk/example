import ReactDOM from 'react-dom';
import Karma from './karma.jsx';

Meteor.startup(() => {
  ReactDOM.render(<Karma />, document.getElementById('app'));
});
