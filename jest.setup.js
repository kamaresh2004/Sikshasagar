/* eslint-env jest */
import 'react-native-gesture-handler/jestSetup';

jest.mock('@react-native-async-storage/async-storage', () => {
  let store = {};
  return {
    __esModule: true,
    default: {
      setItem: jest.fn((key, value) => {
        return new Promise(resolve => {
          store[key] = value;
          resolve();
        });
      }),
      getItem: jest.fn(key => {
        return new Promise(resolve => resolve(store[key] ?? null));
      }),
      removeItem: jest.fn(key => {
        return new Promise(resolve => {
          delete store[key];
          resolve();
        });
      }),
      clear: jest.fn(() => {
        return new Promise(resolve => {
          store = {};
          resolve();
        });
      }),
    },
  };
});
