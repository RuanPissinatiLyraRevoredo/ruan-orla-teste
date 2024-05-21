import React, {useState} from 'react';
import {Switch} from 'react-native';
import styled from 'styled-components/native';
import {useTaskContext} from '../context/TaskContext';
import {NavigationProps, Task} from '../../types/types';

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
`;

const UpdateButton = styled.Button``;

const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const SwitchLabel = styled.Text`
  margin-right: 10px;
`;

const DescriptionLabel = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
`;

type EditTaskScreenProps = NavigationProps<'Edit'>;

const EditTaskScreen: React.FC<EditTaskScreenProps> = ({route, navigation}) => {
  const {taskId} = route.params;
  const {tasks, updateTask} = useTaskContext();
  const task = tasks.find(task => task.id === taskId) as Task; // Asserting the type here
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    task.description,
  );
  const [completed, setCompleted] = useState(task.completed);

  const handleUpdateTask = () => {
    if (!updatedTitle.trim()) {
      alert('Please provide a valid title');
      return;
    }
    updateTask(taskId, {
      ...task,
      title: updatedTitle,
      description: updatedDescription,
      editedAt: new Date().toISOString(),
      completed,
    });
    navigation.goBack();
  };

  return (
    <Container>
      <Title>Edit Task</Title>
      <Input
        value={updatedTitle}
        onChangeText={text => setUpdatedTitle(text)}
        placeholder="Enter task title"
      />
      <DescriptionLabel>Description:</DescriptionLabel>
      <Input
        value={updatedDescription}
        onChangeText={text => setUpdatedDescription(text)}
        placeholder="Enter task description"
        multiline
        numberOfLines={4}
      />
      <SwitchContainer>
        <SwitchLabel>Status:</SwitchLabel>
        <Switch
          value={completed}
          onValueChange={value => setCompleted(value)}
        />
      </SwitchContainer>
      <UpdateButton title="Update Task" onPress={handleUpdateTask} />
    </Container>
  );
};

export default EditTaskScreen;
