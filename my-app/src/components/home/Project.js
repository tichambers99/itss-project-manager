import React, { useContext, useState } from 'react';
import { Popconfirm, Button } from 'antd';

import Task from './Task';
import { UserContext } from '../contexts/user';
import { UpdateProjectContext } from '../contexts/update';

const axios = require('axios');

const Project = (props) => {
  const [updateProject, setUpdateProject] = useContext(UpdateProjectContext);
  const [user, setUser] = useContext(UserContext)
  const { id, name, leader_id } = props.project

  const handleConfirm = () => { 
    if (user.user_id !== leader_id) {
      alert("Only leader can delete this project!")
    }
    else {
      axios.get(`http://localhost:8000/delete/project/${id}`,
      {
        withCredentials: true,
        credentials: 'include'
      })
      .then((res) => {
        setUpdateProject(!updateProject)
      })
      .catch((err) => {
        console.log(err);
        alert(err.response);
      })
    }
  }

  return (
    <div className="content-project">
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <p>{name}</p>
        <Popconfirm
          title="Are you sure to delete this project?"
          onConfirm={handleConfirm}
          okText="Yes"
          cancelText="No"
        >
          <Button danger >Delete</Button>
        </Popconfirm>
      </div>

      <Task 
        projectInfo={{
          id: id,
          name: name
        }}
      />
    </div>
  );
}

export default Project;