/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

test('renders correctly', async () => {
  jest.useFakeTimers();
  try {
    await ReactTestRenderer.act(() => {
      ReactTestRenderer.create(<App />);
    });
    ReactTestRenderer.act(() => {
      jest.runOnlyPendingTimers();
    });
  } finally {
    jest.useRealTimers();
  }
});
