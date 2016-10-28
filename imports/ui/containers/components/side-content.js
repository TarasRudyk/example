import { createContainer } from 'meteor/react-meteor-data';

import { getLocalState } from '/imports/startup/client/local-state';

import SideContent from '/imports/ui/components/side-content';

export default createContainer(() => {
  const sideContent = getLocalState().get('side-content');

  if (sideContent && sideContent.show) {
    return { show: true };
  }

  return {
    show: false
  };
}, SideContent);
