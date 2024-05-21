import React from 'react';
import {GestureResponderEvent} from 'react-native';
import styled from 'styled-components/native';
import {Task} from '../../types/types';

interface Props {
  task: Task;
  onPress?: (event: GestureResponderEvent) => void;
  onDelete?: (event: GestureResponderEvent) => void;
}

const TaskItem = ({task, onDelete, onPress}: Props) => {
  return (
    <TaskContainer>
      <Title>{task.title}</Title>
      <Description>{task.description}</Description>
      <Status completed={task.completed}>
        {task.completed ? 'Concluído' : 'Pendente'}
      </Status>
      <Timestamp>
        Created At: {new Date(task.createdAt).toLocaleString()}
      </Timestamp>
      <Timestamp>
        Updated At: {new Date(task.editedAt).toLocaleString()}
      </Timestamp>
      <ButtonContainer>
        <EditButton onPress={onPress}>
          <ButtonText>Edit</ButtonText>
        </EditButton>
        <DeleteButton onPress={onDelete}>
          <ButtonText>Delete</ButtonText>
        </DeleteButton>
      </ButtonContainer>
    </TaskContainer>
  );
};

export default TaskItem;

const TaskContainer = styled.View`
  padding: 16px;
  margin-bottom: 8px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  background-color: #fff;
  border-radius: 8px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const Description = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
`;

const Status = styled.Text<{completed: boolean}>`
  margin-top: 4px;
  color: ${({completed}) => (completed ? 'green' : 'red')};
`;

const Timestamp = styled.Text`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`;

const EditButton = styled.TouchableOpacity`
  padding: 8px 16px;
  background-color: #4caf50;
  border-radius: 4px;
`;

const DeleteButton = styled.TouchableOpacity`
  padding: 8px 16px;
  background-color: #f44336;
  border-radius: 4px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
