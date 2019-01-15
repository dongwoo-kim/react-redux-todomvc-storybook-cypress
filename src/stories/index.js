import React from 'react';
import {storiesOf} from '@storybook/react';
import {StaticRouter, Route} from 'react-router-dom';
import {withKnobs, radios, boolean} from '@storybook/addon-knobs';
import {withStore} from './addons/store';
import App from '../components/App';

const stories = storiesOf('Todo-App', module)
  .addDecorator(withKnobs)
  .addDecorator(withStore);

stories.add(
  'App',
  () => {
    const options = {
      All: '/All',
      Active: '/Active',
      Completed: '/Completed'
    };

    const location = radios('Filter', options, options.All);

    return (
      <StaticRouter location={location} context={{}}>
        <Route path="/:nowShowing" component={App} />
      </StaticRouter>
    );
  },
  {
    state: () => {
      const isAllCompleted = boolean('Complete All', false);
      const editing = boolean('Editing', false) ? 3 : null;

      return {
        todos: [
          {
            id: 1,
            text: 'Have a Breakfast',
            completed: isAllCompleted || false
          },
          {
            id: 2,
            text: 'Have a Lunch',
            completed: isAllCompleted || true
          },
          {
            id: 3,
            text: 'Have a Dinner',
            completed: isAllCompleted || false
          }
        ],
        editing
      };
    }
  }
);
