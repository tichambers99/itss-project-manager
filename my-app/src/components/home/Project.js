import React, { useState } from 'react';

import Task from './Task';

const Project = (props) => {
  // const [name, setName] = useState(params.project.name);
  return (
    <div className="content-project">
      {props.project.name}
      <Task 
        projectInfo={{
          id: props.project.id,
          name: props.project.name
        }}
      />
    </div>
  );
}

export default Project;