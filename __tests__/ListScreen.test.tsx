// ListScreen.test.tsx
import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import {mockContextValue, render} from './utils/test-utils'; // Use a função personalizada de renderização
import ListScreen from '../app/screens/ListScreen';

const mockNavigation = {
  navigate: jest.fn(),
};

describe('ListScreen', () => {
  it('should render with initial tasks', () => {
    const {getByText} = render(<ListScreen navigation={mockNavigation} />);

    expect(getByText('Task 1')).toBeTruthy();
    expect(getByText('Task 2')).toBeTruthy();
  });
  it('should call deleteTask on task delete', () => {
    const {getAllByText} = render(<ListScreen navigation={mockNavigation} />);
    const deleteButtons = getAllByText('Delete');

    fireEvent.press(deleteButtons[0]);

    expect(mockContextValue.deleteTask).toHaveBeenCalledWith(1);
  });
  it('should filter tasks based on search term', () => {
    const {getByPlaceholderText, getByText, queryByText} = render(
      <ListScreen navigation={mockNavigation} />,
    );
    const searchInput = getByPlaceholderText('Buscar tarefa');

    fireEvent.changeText(searchInput, 'Task 1');

    expect(getByText('Task 1')).toBeTruthy();
    expect(queryByText('Task 2')).toBeNull();
  });

  it('should navigate to Create screen on button press', () => {
    const {getByText} = render(<ListScreen navigation={mockNavigation} />);
    const createButton = getByText('Criar Tarefa');

    fireEvent.press(createButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Create');
  });

  it('should navigate to Edit screen on task press', () => {
    const {getByText} = render(<ListScreen navigation={mockNavigation} />);
    const taskItem = getByText('Task 1');

    fireEvent.press(taskItem);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Edit', {taskId: 1});
  });
});
