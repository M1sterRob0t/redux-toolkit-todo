import type { TTask } from '../../types/task';
import './Task.css';
import { Checkbox } from 'antd';
import { memo } from 'react';
import { useDeleteTaskMutation, useToggleTaskMutation } from '../../store/api';

interface ITask {
  task: TTask;
}

function Task({ task }: ITask): JSX.Element {
  const [toggleTaskStatus] = useToggleTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  return (
    <li className="task">
      <label>
        <Checkbox
          className="task__checkox"
          type="checkbox"
          name="completed"
          checked={task.isCompleted}
          onChange={() => toggleTaskStatus({ ...task, isCompleted: !task.isCompleted })}
        />
        <span className={`task__text ${task.isCompleted ? 'task__text--crossed' : ''}`}>
          {task.text}
        </span>
        <button
          className="task__button"
          type="button"
          onClick={() => deleteTask(task.id)}
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
