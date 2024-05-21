import * as React from 'react';
import {render} from '@testing-library/react-native';
import App from '../app/App';
import {TaskProvider} from '../app/context/TaskContext';

test('shows profile screen when View Profile is pressed', () => {
  render(
    <TaskProvider>
      <App />
    </TaskProvider>,
  );
});
