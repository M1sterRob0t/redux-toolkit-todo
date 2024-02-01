import { Button, Input } from 'antd';
import { nanoid } from 'nanoid';
import { useAppDispatch } from '../../hooks';
import { postTask } from '../../store/async-actions';
import { memo } from 'react';


const FormElementName = {
  NewTask: 'new-task',
};

function NewTaskForm() {
  const dispatch = useAppDispatch();

  function onAddNewTask(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const form = evt.currentTarget;
    const formData = new FormData(form);
    const description = formData.get(FormElementName.NewTask);

    if (description && typeof description === 'string') {
      dispatch(
        postTask({
          id: nanoid(),
          text: description,
          isCompleted: false,
        })
      );
    }

    form[FormElementName.NewTask].value = '';
  }

  return (
    <form className="app__form" onSubmit={onAddNewTask}>
      <Input className="app__input" type="text" name={FormElementName.NewTask} />
      <Button className="app__button" type="primary" htmlType="submit">
        Add new task
      </Button>
    </form>
  );
}

export default memo(NewTaskForm);
