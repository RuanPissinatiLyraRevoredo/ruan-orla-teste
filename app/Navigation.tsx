import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ListScreen from './screens/ListScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreenStateProvider} from './context/ScreenStateContext';
import CreateScreen from './screens/CreateScreen';
import EditScreen from './screens/EditScreen';
import {RootStackParamList} from '../types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{title: 'Lista de Tarefas'}}
        />
        <Stack.Screen
          name="Create"
          component={CreateScreen}
          options={{title: 'Criar Tarefa'}}
        />
        <Stack.Screen
          name="Edit"
          component={EditScreen}
          options={{title: 'Editar Tarefa'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
