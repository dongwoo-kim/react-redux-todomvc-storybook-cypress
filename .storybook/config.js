import { configure } from '@storybook/react';

function loadStories() {
  require('../src/stories/index');
}

configure(loadStories, module);
