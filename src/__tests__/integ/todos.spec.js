import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { StaticRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import 'jest-dom/extend-expect';

import { createStore } from '../../store';
import { TOGGLE_TODO } from '../../actions';
import App from '../../components/App';

const createMockStore = configureStore([thunk]);

function renderWithStore(store) {
  return render(
    <Provider store={store}>
      <StaticRouter location="/All" context={{}}>
        <Route path="/:nowShowing" component={App} />
      </StaticRouter>
    </Provider>
  );
}

afterEach(cleanup);

it('should render todo Items', () => {
  const store = createMockStore({
    todos: [
      {
        id: 1,
        text: 'Have Breakfast',
        completed: true
      },
      {
        id: 2,
        text: 'Have Lunch',
        completed: false
      }
    ]
  });

  const { getAllByTestId } = renderWithStore(store);
  const todoItems = getAllByTestId('todo-item');

  expect(todoItems[0]).toHaveTextContent('Have Breakfast');
  expect(todoItems[0]).toHaveClass('completed');
  expect(todoItems[1]).toHaveTextContent('Have Lunch');
  expect(todoItems[1]).not.toHaveClass('completed');
});

it('should trigger TOGGLE_TODO when click checkbox', () => {
  const store = createMockStore({
    todos: [
      {
        id: 1,
        text: 'Have Breakfast',
        completed: true
      }
    ]
  });

  const { getByTestId } = renderWithStore(store);
  const checkbox = getByTestId('todo-item').querySelector('[type=checkbox]');
  fireEvent.click(checkbox);

  expect(store.getActions()[0]).toEqual({
    type: TOGGLE_TODO,
    id: 1
  });
});

it('should append todo item when input new todo', async () => {
  // (1-1) 스토어 현재 상태 설정하기
  const initialState = {
    todos: [
      {
        id: 1,
        text: 'Have Breakfast',
        completed: true
      }
    ]
  };
  const store = createStore(initialState);

  // (1.2) 서버 동기화 확인 요청을 위한 axios 목킹
  jest.spyOn(axios, 'put');

  // (1.3) 실제 애플리케이션 렌더링
  const { getByTestId } = renderWithStore(store);

  // (2) input에 텍스트 입력 후 엔터 키 입력
  const todoInput = getByTestId('todo-input');
  fireEvent.change(todoInput, { target: { value: 'Have a Coffee' } });
  fireEvent.keyDown(todoInput, { keyCode: 13 });

  // (3-1) 스토어의 현재 상태 검증하기
  expect(store.getState().todos).toEqual([
    ...initialState.todos,
    {
      id: 2,
      text: 'Have a Coffee',
      completed: false
    }
  ]);

  // (3-2) 서버에 동기화 요청을 했는지 검증하기
  await Promise.resolve();
  expect(axios.put.mock.calls[0][1]).toEqual(store.getState().todos);
});
