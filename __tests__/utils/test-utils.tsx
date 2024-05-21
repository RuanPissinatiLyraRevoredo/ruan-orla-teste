// utils/test-utils.tsx
import React from 'react';
import {
  RenderOptions,
  render as rtlRender,
} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';

import {Task} from '../../types/types';
import {TaskContext} from '../../app/context/TaskContext';

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description 1',
    completed: false,
    createdAt: '',
    editedAt: '',
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Description 2',
    completed: false,
    createdAt: '',
    editedAt: '',
  },
];

export const mockContextValue = {
  tasks: mockTasks,
  filterTasks: jest.fn((searchTerm: string) =>
    mockTasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  ),
  deleteTask: jest.fn(),
};

const AllTheProviders: React.FC = ({children}) => {
  return (
    <TaskContext.Provider value={mockContextValue}>
      <NavigationContainer>{children}</NavigationContainer>
    </TaskContext.Provider>
  );
};

const customRender = (
  ui: React.ReactElement<unknown, string | React.JSXElementConstructor<any>>,
  options?: RenderOptions | undefined,
) => rtlRender(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react-native';
// override render method
export {customRender as render};
