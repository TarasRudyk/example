import ReactDOM from 'react-dom';
import Demo from './demo.jsx';

Meteor.startup(() => {
  ReactDOM.render(<Demo />, document.getElementById('react-app'));
});
