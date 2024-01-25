import type { TTask} from '../../types/task';
import './Task.css';
import { removeTask, toggleTask } from '../../store/tasksReducer';
import { useAppDispatch } from '../../hooks';

interface ITask {
  task: TTask;
}

function Task({ task }: ITask): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <li className="task">
      <label>
        <input
          type="checkbox"
          name="completed"
          checked={task.isCompleted}
          onChange={() => dispatch(toggleTask(task.id))}
        />
        <span>{task.text}</span>
        <button type="button" onClick={() => dispatch(removeTask(task.id))}></button>
      </label>
    </li>
  );
}

export default Task;
