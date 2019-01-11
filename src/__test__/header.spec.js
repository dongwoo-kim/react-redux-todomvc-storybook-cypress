import React from 'react';
import { render } from 'react-dom';
import prettyHTML from 'diffable-html';
import { Header } from '../components/header';
import renderer from 'react-test-renderer';

it('Header component', () => {
  const el = document.createElement('div');
  render(<Header addTodo={() => {}} />, el);

  const outputHTML = prettyHTML(`
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" value="" />
    </header>
  `);

  expect(prettyHTML(el.innerHTML)).toBe(outputHTML);
});

it('Header component - Snapshot', () => {
  const el = document.createElement('div');
  render(<Header addTodo={() => {}} />, el);

  expect(prettyHTML(el.innerHTML)).toMatchSnapshot();
});

it('Header component - Snapshot', () => {
  const tree = renderer.create(<Header />).toJSON();

  expect(tree).toMatchSnapshot();
});
