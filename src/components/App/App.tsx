import { useEffect } from 'react';
import TasksList from '../TasksList/TasksList';
import './App.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addTask, addTasks, selectTasks } from '../../store/tasksReducer';
import type { TServerTask, TTask } from '../../types/task';

const FormElementName = {
  NewTask: 'new-task',
}

function tasksAdapter(serverTasks: TServerTask[]): TTask[] {
  return serverTasks.filter((task, index) => {
      const lastIndex = serverTasks.findLastIndex((el) => el.description === task.description);
      return index === lastIndex;
    }).map((task) => ({
      id: task.id,
      text: task.description,
      isCompleted: task.is_archived,
    }));
}

function App(): JSX.Element {
  const todos = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch('https://14.ecmascript.pages.academy/task-manager/tasks', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic fjsdfuyh2c8#294yr2#^497&8ryc^74x9$ryb7yc3c4978@sad',
      },
    })
      .then((data) => data.json())
      .then((data: TServerTask[]) => tasksAdapter(data))
      .then((tasks: TTask[]) => dispatch(addTasks(tasks)))
      .catch((err) => console.error(err));
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
