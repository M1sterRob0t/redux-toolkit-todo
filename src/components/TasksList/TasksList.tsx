import Task from '../Task/Task';
import type { TTask } from '../../types';
import './TasksList.css';

interface ITasksList {
  tasks: TTask[];
}

function TasksList({ tasks }: ITasksList) {
  return (
    <ul className='tasks'>
      {tasks.map((task) => (
        <Task task={task} key={task.id}/>
      ))}
    </ul>
  );
}

export default TasksList;
