import { createContainer } from 'meteor/react-meteor-data';

import { getLocalState } from '/imports/startup/client/local-state';

import SideContent from '/imports/ui/components/side-content/main';

export default createContainer(() => {
  const componentName = getLocalState().get('side-content');

  if (!componentName) {
    return {
      show: false,
      name: ''
    };
  }

  return {
    show: true,
    name: componentName
  };
}, SideContent);
