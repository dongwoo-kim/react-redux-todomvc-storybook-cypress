import App from '../components/app';
import reducer from '../reducers';
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import prettyHTML from 'diffable-html';

const store = createStore(reducer);

it('Hello', () => {
    const el = document.createElement('div');

    render(
        <Provider store={store}>
            <BrowserRouter>
                <Route path="/:nowShowing?" component={App} />
            </BrowserRouter>
        </Provider>,
        el
    );

    expect(prettyHTML(el.innerHTML)).toBe(
        prettyHTML(`
          <div class="todoapp">
            <header class="header">
              <h1>todos</h1>
              <input class="new-todo" placeholder="What needs to be done?" value="">
            </header>
            <section class="main">
              <input type="checkbox" class="toggle-all">
              <ul class="todo-list">
                <li class=" ">
                    <div class="view">
                        <input class="toggle" type="checkbox">
                        <label>아침먹기</label>
                        <button class=\"destroy\"></button>
                    </div>
                    <input class=\"edit\" value=\"아침먹기\">
                </li>
            </ul>
            </section>
            <footer class=\"footer\">
                <span class=\"todo-count\">
                    <strong>1</strong><span> items</span><span> left</span>
                </span>
                <ul class=\"filters\">
                    <li><a disabled=\"\" class=\"filter-item selected\" href=\"/All\">All</a></li>
                    <li><a class=\"filter-item \" href=\"/Active\">Active</a></li>
                    <li><a class=\"filter-item \" href=\"/Completed\">Completed</a></li>
                </ul>
            </footer>
          </div>
  `));
})