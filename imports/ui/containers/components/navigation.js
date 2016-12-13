import { getLocalState } from '/imports/startup/client/local-state';
import { createContainer } from 'meteor/react-meteor-data';

import Navigation from '/imports/ui/components/navigation/main';

export default createContainer(() => {
  const appNavigation = getLocalState().get('app-navigation') || 'navigation';

  return {
    appNavigation
  };
}, Navigation);
