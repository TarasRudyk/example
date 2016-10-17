import { createProject } from './methods';

export const create = () => {
  createProject.call({
    name: 'My new project',
    description: 'Simple landing page'
  }, (err) => {
    if (err) {
      console.log(err);
    } else {
      // success!
    }
  });
};
