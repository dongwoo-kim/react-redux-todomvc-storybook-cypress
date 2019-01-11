import React from 'react';

import { storiesOf } from '@storybook/react';
import { Header } from '../components/Header';
import { TodoItem } from '../components/TodoItem';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import '../components/App.css';

const stories = storiesOf('TodoApp', module);

stories.addDecorator(withKnobs);

stories
  .add('Header', () => (
    <div className="todoapp">
      <Header addTodo={action('addTodo')} />
    </div>
  ))
  .add('TodoItem - 일반', () => (
    <div className="todoapp">
      <ul className="todo-list">
        <TodoItem
          isEditing={false}
          todo={{ id: 1, text: '아침먹기', completed: false }}
        />
      </ul>
    </div>
  ))
  .add('TodoItem - 완료됨', () => (
    <div className="todoapp">
      <ul className="todo-list">
        <TodoItem
          isEditing={false}
          todo={{ id: 1, text: '아침먹기', completed: true }}
        />
      </ul>
    </div>
  ))
  .add('TodoItem - 수정중', () => (
    <div className="todoapp">
      <ul className="todo-list">
        <TodoItem
          isEditing={true}
          todo={{ id: 1, text: '아침먹기', completed: true }}
        />
      </ul>
    </div>
  ));
// .add('TodoItem', () => (

// ));
