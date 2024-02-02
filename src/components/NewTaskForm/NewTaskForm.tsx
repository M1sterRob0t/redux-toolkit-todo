import { Button, Input, Form } from 'antd';
import { nanoid } from 'nanoid';
import { memo } from 'react';
import { usePostTaskMutation } from '../../store/api';

const FormElementName = {
  NewTask: 'new-task',
};

function NewTaskForm() {
  const [postTask] = usePostTaskMutation();
  const [antdForm] = Form.useForm();

  function onAddNewTask(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const description = antdForm.getFieldValue(FormElementName.NewTask);
    if (description && typeof description === 'string') {
      postTask({
        id: nanoid(),
        text: description,
        isCompleted: false,
      }).then(() => {
        antdForm.resetFields();
      });
    }
  }

  return (
    <Form
      className="app__form"
      onSubmitCapture={onAddNewTask}
      form={antdForm}
    >
      <Form.Item className="app__input" name={FormElementName.NewTask}>
        <Input />
      </Form.Item>
      <Button className="app__button" type="primary" htmlType="submit">
        Add new task
      </Button>
    </Form>
  );
}

export default memo(NewTaskForm);
