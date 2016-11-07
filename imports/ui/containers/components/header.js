import { getLocalState } from '/imports/startup/client/local-state';
import { createContainer } from 'meteor/react-meteor-data';

import Header from '/imports/ui/components/header';

export default createContainer(() => {
  const sideContentName = getLocalState().get('side-content');

  return {
    sideContentName
  };
}, Header);