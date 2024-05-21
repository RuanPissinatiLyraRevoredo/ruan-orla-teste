import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  List: undefined;
  Create: undefined;
  Edit: {taskId: number};
};

export type NavigationProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};
export interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  editedAt: string;
  completed: boolean;
}
