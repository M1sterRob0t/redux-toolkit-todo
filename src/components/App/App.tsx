import { useEffect } from 'react';
import TasksList from '../TasksList/TasksList';
import './App.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchTasks } from '../../store/async-actions';
import { selectTasksState } from '../../store/reducers/tasks/tasksReducer';
import Loading from '../Loading/Loading';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FilterType, toastConfig } from '../../constants';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { selectThemeStatus } from '../../store/reducers/theme/themeReducer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import 'react-toastify/dist/ReactToastify.css';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { selectCurrentFilter, switchFilter } from '../../store/reducers/filter/filterReducer';
import type { TTask } from '../../types/task';

function filterTasks(tasks: TTask[], filter: FilterType) {
  switch(filter) {
    case FilterType.All: {
      return tasks;
    }
    case FilterType.Active: {
      return tasks.filter((task) => !task.isCompleted)
    }
    case FilterType.Completed: {
      return tasks.filter((task) => task.isCompleted)
    }
    default: {
      return tasks;
    }
  }
}

const tabs: TabsProps['items'] = [
  {
    key: FilterType.All,
    label: FilterType.All,
  },
  {
    key: FilterType.Active,
    label: FilterType.Active,
  },
  {
    key: FilterType.Completed,
    label: FilterType.Completed,
  },
];

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const {error, isLoading, list: tasks} = useAppSelector(selectTasksState);
  const currentFilter = useAppSelector(selectCurrentFilter);
  const isDarkMode = useAppSelector(selectThemeStatus);
  const filteredTodos = filterTasks(tasks, currentFilter);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (error) {
    toast.error(`${error.status} - ${error.statusText}`, toastConfig);
  }

  function onFilterChange(key: string) {
    dispatch(switchFilter(key as FilterType));
  }

  return (
    <div className={`app ${isDarkMode ? 'app--dark' : ``}`}>
      <div className="app__inner">
        <div className="app__top-panel">
          <ThemeSwitcher />
          <NewTaskForm />
        </div>
        <Tabs className="app__filter" activeKey={currentFilter} items={tabs} onChange={onFilterChange} />
        {isLoading && <Loading />}
        <TasksList tasks={filteredTodos} />
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
