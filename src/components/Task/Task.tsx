import type { TTask } from '../../types/task';
import './Task.css';
import { useAppDispatch } from '../../hooks';
import { deleteTask, toggleTaskStatus } from '../../store/async-actions';
import { Checkbox } from 'antd';
import { memo } from 'react';

interface ITask {
  task: TTask;
}

function Task({ task }: ITask): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <li className="task">
      <label>
        <Checkbox
          className="task__checkox"
          type="checkbox"
          name="completed"
          checked={task.isCompleted}
          onChange={() => dispatch(toggleTaskStatus({ ...task, isCompleted: !task.isCompleted }))}
        />
        <span className={`task__text ${task.isCompleted ? 'task__text--crossed' : ''}`}>
          {task.text}
        </span>
        <button
          className="task__button"
          type="button"
          onClick={() => dispatch(deleteTask(task.id))}
        ></button>
      </label>
    </li>
  );
}

export default memo(Task, (oldProps, currentProps) => {
  const statusTheSame = oldProps.task.isCompleted === currentProps.task.isCompleted;
  const textTheSame = oldProps.task.text === currentProps.task.text;

  if (statusTheSame && textTheSame) {
    return true;
  }

  return false;
});
