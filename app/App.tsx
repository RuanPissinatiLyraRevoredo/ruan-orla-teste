import * as React from 'react';
import {TaskProvider} from './context/TaskContext';
import Navigation from './Navigation';

const App = () => {
  return <TaskProvider children={<Navigation />} />;
};

export default App;
