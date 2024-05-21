import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import TaskItem from '../components/TaskItem';
import {NavigationProps, Task} from '../../types/types';
import {useTaskContext} from '../context/TaskContext';

const ListScreen = ({navigation}: NavigationProps<'List'>) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const {tasks, filterTasks, deleteTask} = useTaskContext();

  const handleTaskCreate = () => {
    navigation.navigate('Create');
  };

  const handleTaskEdit = (id: number) => {
    navigation.navigate('Edit', {taskId: id});
  };

  const handleTaskDelete = (id: number) => {
    deleteTask(id);
  };

  // Filtrar as tarefas com base no termo de pesquisa
  const filteredTasks = filterTasks(searchTerm);

  return (
    <Container>
      <SearchInput
        placeholder="Buscar tarefa"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      {filteredTasks.length > 0 ? (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item: Task) => item.id.toString()}
          renderItem={({item}) => (
            <TaskItem
              key={item.id}
              task={item}
              onPress={() => handleTaskEdit(item.id)}
              onDelete={() => handleTaskDelete(item.id)}
            />
          )}
        />
      ) : tasks.length > 0 ? (
        <NoTasksText>Nenhuma tarefa encontrada</NoTasksText>
      ) : (
        <NoTasksText>Nenhuma tarefa adicionada</NoTasksText>
      )}
      <CreateButton title="Criar Tarefa" onPress={handleTaskCreate} />
    </Container>
  );
};

export default ListScreen;

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #f8f8f8;
`;

const SearchInput = styled.TextInput`
  height: 40px;
  padding: 8px;
  margin-bottom: 16px;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 8px;
`;

const CreateButton = styled.Button`
  margin-top: 16px;
`;

const NoTasksText = styled.Text`
  text-align: center;
  color: #888;
  font-size: 16px;
  margin: 20px 0;
`;
