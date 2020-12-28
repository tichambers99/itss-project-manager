import React, { useEffect, useState, useContext } from 'react';
import { Layout, Row, Col, Modal, Button } from 'antd';

import Project from './Project';
import AddTask from './AddTask';

import { UserContext } from '../contexts/user';
import { UpdateProjectContext } from '../contexts/update';

const { Content } = Layout;
const axios = require('axios')

const colRes = {
  xs: 24,
  sm: 12,
  lg: 8,
  xl: 6
}

const ContentHome = () => {
  const [projects, setProjects] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [updateProject, setUpdateProject] = useContext(UpdateProjectContext);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/project',
    {
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      setProjects([...res.data.Project]);
    })
    .catch((err) => {
      console.log(err);
      setIsModalVisible(true);
      alert(err)
    })
  }, [updateProject]);

  useEffect( () => {
    axios.get('http://localhost:8000/users',
    {
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      setUser(res.data.result[0])
      console.log(res.data.result[0])
    })
    .catch((err) => {
      console.log(err);
      alert(err)
    })
  }, [])
  
  return (
    <div>
      <Modal
        title="Authentication required!"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Button danger href='/sign-in'>
          Login again
        </Button>
      </Modal>

      <Content>
        <h2 className="content-title">Project Manager</h2>
        <div className="content site-layout-background content-background">
          <Row gutter={[16, 24]} style={{width: "100%"}}>
            {
              projects.map((project, key) => {
                return (
                  <Col key={key} span={6} bordered={true} {...colRes} className="content-col">
                    <Project project={project}/>
                    <AddTask projectId={project.id}/>
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

export default ContentHome;