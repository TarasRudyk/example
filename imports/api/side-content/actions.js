import { check } from 'meteor/check';

import { getLocalState } from '/imports/startup/client/local-state';

export const toggleSideContent = (componentName) => {
  check(componentName, String);

  const currentComponentName = getLocalState().get('side-content');

  if (currentComponentName && currentComponentName === componentName) {
    getLocalState().set('side-content', '');
  } else {
    getLocalState().set('side-content', componentName);
  }
};
