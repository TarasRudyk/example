import { check } from 'meteor/check';

import { getLocalState } from '/imports/startup/client/local-state';

export const toggleSideContent = (name) => {
  check(name, String);

  const sideContent = getLocalState().get('side-content');

  if (sideContent && sideContent.name && sideContent.name === name) {
    getLocalState().set('side-content', { show: false });
  } else {
    getLocalState().set('side-content', { name, show: true });
  }
};
