import { createContainer } from 'meteor/react-meteor-data';

import { getLocalState } from '/imports/startup/client/local-state';

import SideContent from '/imports/ui/components/side-content/side-content';

export default createContainer(() => {
  const componentName = getLocalState().get('side-content');
  let component;

  if (!componentName) {
    return {
      show: false,
      name: ''
    };
  }

  switch (componentName) {
    case 'all-tasks':
      component = 'All tasks';
      break;
    case 'incoming-tasks':
      component = 'Incoming tasks';
      break;
    case 'notifications':
      component = 'Notifications';
      break;
    default:
      component = 'Loading';
  }

  return {
    show: true,
    name: component
  };
}, SideContent);
