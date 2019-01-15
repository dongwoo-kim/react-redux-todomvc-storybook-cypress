import _ from 'lodash';
import React from 'react';
import {action} from '@storybook/addon-actions';
import {Provider} from 'react-redux';

function createMockStore(initialState) {
  let state = initialState;
  const listeners = [];

  return {
    dispatch(actionObj) {
      action(actionObj.type)(actionObj);
    },
    getState() {
      return state;
    },
    setState(newState) {
      state = newState;
      if (listeners.length) {
        listeners.forEach(listener => listener(state));
      }
    },
    subscribe(fn) {
      listeners.push(fn);
      return () => {
        const index = listeners.indexOf(fn);
        if (index) {
          listeners.splice(index, 1);
        }
      };
    }
  };
}

let store = createMockStore({});
let lastStoryInfo = {kind: '', story: ''};

function isSameStory(s1, s2) {
  return s1.kind === s2.kind && s1.story === s2.story;
}

export function withStore(storyFn, context) {
  let state = context.parameters.state || {};
  if (typeof state === 'function') {
    state = state();
  }

  const storyInfo = _.pick(context, ['kind', 'story']);
  if (isSameStory(lastStoryInfo, context)) {
    store.setState(state);
  } else {
    store = createMockStore(state);
  }

  lastStoryInfo = storyInfo;

  return <Provider store={store}>{storyFn()}</Provider>;
}
