import { useEffect } from 'react';
import TasksList from '../TasksList/TasksList';
import './App.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addTask, addTasks, selectTasks } from '../../store/tasksReducer';
import type { TTask } from '../../types/task';
import { fetchTasks } from '../../store/async-actions';

const FormElementName = {
  NewTask: 'new-task',
}

function App(): JSX.Element {
  const todos = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchTasks().then((tasks: void | TTask[]) => {
      if (tasks) {
        dispatch(addTasks(tasks));
      }
    });
  }, [dispatch]);

  function onAddNewTask(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const form = evt.currentTarget;
    const formData = new FormData(form);
    const description = formData.get(FormElementName.NewTask);

    if (description && typeof description  === 'string') {
      dispatch(addTask({
        id: '1',
        text: description,
        isCompleted: false,
      }));
    }

    form[FormElementName.NewTask].value = '';
  }

  return (
    <div className="app">
      <div>
        <form onSubmit={onAddNewTask}>
          <input
            type="text"
            name={FormElementName.NewTask}
          />
          <button>Add new task</button>
        </form>
      </div>
      <TasksList tasks={todos} />
    </div>
  );
}

export default App;
