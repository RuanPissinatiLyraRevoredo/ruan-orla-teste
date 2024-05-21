import React, {useState} from 'react';
import styled from 'styled-components/native';
import {NavigationProps} from '../../types/types';
import {useTaskContext} from '../context/TaskContext';

const CreateScreen = ({navigation}: NavigationProps<'Create'>) => {
  const {tasks, addTask} = useTaskContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateTask = () => {
    const newTask = {
      id: tasks.length + 1, // Gerar um novo ID para a tarefa
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
      editedAt: new Date().toISOString(),
    };
    addTask(newTask);
    navigation.navigate('List');
  };

  return (
    <Container>
      <StyledTextInput
        placeholder="Digite o título da tarefa"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <StyledTextInput
        placeholder="Digite a descrição da tarefa"
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <StyledButton title="Criar" onPress={handleCreateTask} />
    </Container>
  );
};

export default CreateScreen;

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #f8f8f8;
`;

const StyledTextInput = styled.TextInput`
  height: 40px;
  padding: 8px;
  margin-bottom: 16px;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 8px;
  background-color: #fff;
`;

const StyledButton = styled.Button`
  margin-top: 16px;
`;
