import React, { useContext, useState } from 'react';

import { Button, Input } from 'antd';
import { UpdateTaskContext } from '../contexts/update';

const axios = require('axios')

const AddTask = (params) => {
  const [visibleClass, setVisibleClass] = useState('add-task-container-hidden');
  const [text, setText] = useState('add task');
  const [updateTask, setUpdateTask] = useContext(UpdateTaskContext);
  let newTask = {
    status: 0,
    introduction: "",
    deadline: new Date(Date.now()).toISOString().slice(0, 10),
    deleted: 0,
    created_date: new Date(Date.now()).toISOString().slice(0, 10),
    project_id: params.projectId
  } 

  const displayInput = () => {
    visibleClass === 'add-task-container-hidden' ? setVisibleClass('add-task-container-visible') : setVisibleClass('add-task-container-hidden');
    visibleClass === 'add-task-container-hidden' ? setText('cancel') : setText('add task');
  }

  const createTask = () => {
    setVisibleClass('add-task-container-hidden');
    setText('add task');
    console.log(newTask)
    axios.post('http://localhost:8000/create/task',
    {
      ...newTask
    },
    {
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      setUpdateTask(!updateTask);
    })
    .catch((err) => {
      console.log(err);
      alert(err)
    })
  }

  return (
    <div className="content-project-task">
      <Button ghost onClick={() => displayInput()}>{text}</Button>
      <div className={`${visibleClass}`}>
        <div className="add-task">
          <Input 
            placeholder="Task title" 
            onChange={(e) => newTask.name = e.target.value}
          />
          <Button className="btn-task-create" onClick={() => createTask()}>Create</Button>
        </div>
      </div>
    </div>
  );
}

export default AddTask;