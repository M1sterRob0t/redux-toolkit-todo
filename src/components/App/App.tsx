import TasksList from '../TasksList/TasksList';
import './App.css';
import { useAppSelector } from '../../hooks';
import Loading from '../Loading/Loading';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FilterType } from '../../constants';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { selectThemeStatus } from '../../store/reducers/theme/themeReducer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import 'react-toastify/dist/ReactToastify.css';

import { selectCurrentFilter } from '../../store/reducers/filter/filterReducer';
import type { TTask } from '../../types/task';
import { useGetTasksQuery } from '../../store/api';
import Filter from '../Filter/Filter';

function filterTasks(tasks: TTask[], filter: FilterType) {
  switch (filter) {
    case FilterType.All: {
      return tasks;
    }
    case FilterType.Active: {
      return tasks.filter((task) => !task.isCompleted);
    }
    case FilterType.Completed: {
      return tasks.filter((task) => task.isCompleted);
    }
    default: {
      return tasks;
    }
  }
}

function App(): JSX.Element {
  const { data: tasks, isFetching } = useGetTasksQuery();

  const currentFilter = useAppSelector(selectCurrentFilter);
  const isDarkMode = useAppSelector(selectThemeStatus);

  const filteredTodos = tasks ? filterTasks(tasks, currentFilter) : [];

  return (
    <div className={`app ${isDarkMode ? 'app--dark' : ``}`}>
      <div className="app__inner">
        <div className="app__top-panel">
          <ThemeSwitcher />
          <NewTaskForm />
        </div>
        <Filter className="app__filter"currentFilter={currentFilter} />
        {isFetching && <Loading />}
        <TasksList tasks={filteredTodos} />
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
