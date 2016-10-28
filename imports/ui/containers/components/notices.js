import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import Notices from '/imports/ui/components/notices';

export default createContainer(() => {
  const notices = Session.get('notices');

  Session.set('notices', []);

  return {
    notices
  };
}, Notices);
