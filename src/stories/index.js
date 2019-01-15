import React from 'react';

import {storiesOf} from '@storybook/react';
import {Header} from '../components/Header';
import {TodoItem} from '../components/TodoItem';
import '../components/App.css';

const stories = storiesOf('Todo-App', module);

stories.add('Header', () => (
  <div className="todoapp">
    <Header addTodo={() => {}} />
  </div>
));

stories.add('TodoItem - Normal', () => (
  <div className="todoapp">
    <ul className="todo-list">
      <TodoItem
        id={1}
        text="Have a Breakfast"
        comleted={false}
        editing={false}
      />
    </ul>
  </div>
));

stories.add('TodoItem - Completed', () => (
  <div className="todoapp">
    <ul className="todo-list">
      <TodoItem
        id={1}
        text="Have a Breakfast"
        comleted={true}
        editing={false}
      />
    </ul>
  </div>
));

stories.add('TodoItem - Editing', () => (
  <div className="todoapp">
    <ul className="todo-list">
      <TodoItem
        id={1}
        text="Have a Breakfast"
        comleted={false}
        editing={true}
      />
    </ul>
  </div>
));
