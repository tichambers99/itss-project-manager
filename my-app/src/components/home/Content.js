import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Modal, Button } from 'antd';

import Project from './Project';
import AddTask from './AddTask';

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
      console.log(res)
      setProjects([...projects, ...res.data.Project]);
    })
    .catch((err) => {
      console.log(err);
      setIsModalVisible(true);
      alert(err)
    })
  }, []);
  // console.log(projects)
  return (
    <div>
      <Modal
        title="Authentication needed!"
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
                    <AddTask />
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