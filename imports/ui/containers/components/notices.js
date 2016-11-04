import { getLocalState } from '/imports/startup/client/local-state';
import { createContainer } from 'meteor/react-meteor-data';

import Notices from '/imports/ui/components/notices';

export default createContainer(() => {
  const notices = getLocalState().get('notices');

  getLocalState().set('notices', []);

  return {
    notices
  };
}, Notices);
