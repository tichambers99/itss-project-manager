import React, { useEffect, useState, useContext } from 'react';
import { Progress, Layout, Row, Col, Tooltip } from 'antd';

import { UpdateProjectContext } from '../contexts/update';

const { Content } = Layout;
const axios = require('axios')

const colRes = {
  xs: 24,
  sm: 12,
  lg: 8,
  xl: 6
}

const ProjectProgress = () => {
  const [projects, setProject] = useState([]);
  
  const [updateProject, setUpdateProject] = useContext(UpdateProjectContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`http://localhost:8000/project/progress`,
        {
          withCredentials: true,
          credentials: 'include'
        })
        setProject(res.data.result)
      } catch (err) {
        alert(err)
      }
    })()
  }, [updateProject]);
  
  return (
    <div>
      <Content>
        <h2 className="content-title">Progress</h2>
        <div 
          className="content site-layout-background content-background"
          style={{ textAlign: "center" }}
        >
          <Row gutter={[16, 24]} style={{width: "100%"}}>
          {
            projects.length !== 0 && 
            projects.map((project, key) => {
              const { id, name, taskDone, work_counts } = project
              return (
                  <Col key={key} span={6} bordered={true} {...colRes} className="content-col">
                    <Tooltip
                      color="#108ee9"
                      placement="right"
                      title={() => {
                        return (
                          <div>
                            <p>Tasks done: { taskDone }</p>
                            <p>Total tasks: { work_counts }</p>
                          </div>
                        )
                      }}
                    >
                      <Progress
                        key={id}
                        type="circle"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={Math.round(taskDone / work_counts * 10000) / 100}
                      />
                    </Tooltip>
                    <h4 className="progress-project-name">{ name }</h4>
                  </Col>
              )
            })
          }
          </Row>
        </div>
      </Content>
    </div>
  );
}

export default ProjectProgress;