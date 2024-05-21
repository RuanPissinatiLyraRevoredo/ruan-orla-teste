// TaskContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useState, useEffect} from 'react';
import {Task} from '../../types/types';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (taskId: number, updatedTask: Task) => void;
  filterTasks: (term: string) => Task[];
  deleteTask: (taskId: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({children}: {children: React.ReactNode}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Error fetching tasks from AsyncStorage:', error);
      }
    };

    fetchTasks();
  }, []);

  const saveTasks = async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Error saving tasks to AsyncStorage:', error);
    }
  };

  const addTask = (newTask: Task) => {
    newTask.createdAt = new Date().toISOString();
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const updateTask = (taskId: number, updatedTask: Task) => {
    updatedTask.editedAt = new Date().toISOString();
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? updatedTask : task,
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const filterTasks = (term: string) => {
    return tasks.filter(task =>
      task.title.toLowerCase().includes(term.toLowerCase()),
    );
  };
  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider
      value={{tasks, addTask, updateTask, filterTasks, deleteTask}}>
      {children}
    </TaskContext.Provider>
  );
};
export {TaskContext};
