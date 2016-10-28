import { ReactiveDict } from 'meteor/reactive-dict';

export const getLocalState = (() => {
  const LocalState = new ReactiveDict();

  return () => LocalState;
})();
