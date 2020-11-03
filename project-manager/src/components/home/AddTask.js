import React, { useState } from 'react';

import { Button, Input } from 'antd';

const AddTask = () => {
  const [visibleClass, setVisibleClass] = useState('add-task-container-hidden');
  const [text, setText] = useState('add task');

  const displayInput = () => {
    visibleClass === 'add-task-container-hidden' ? setVisibleClass('add-task-container-visible') : setVisibleClass('add-task-container-hidden');
    visibleClass === 'add-task-container-hidden' ? setText('cancel') : setText('add task');
  }

  const createTask = () => {
    setVisibleClass('add-task-container-hidden');
    setText('add task');
  }

  return (
    <div className="content-project-task">
      <Button ghost onClick={() => displayInput()}>{text}</Button>
      <div className={`${visibleClass}`}>
        <div className="add-task">
          <Input placeholder="Task title" />
          <Button className="btn-task-create" onClick={() => createTask()}>Create</Button>
        </div>
      </div>
    </div>
  );
}

export default AddTask;