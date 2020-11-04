import React from 'react';
import { Layout, Row, Col } from 'antd';

import Project from './Project';
import AddTask from './AddTask';

const { Content } = Layout;

const ContentHome = () => {
  return (
    <Content>
      <h2 className="content-title">Project Manager</h2>
      <div className="content site-layout-background content-background">
        <Row gutter={[16, 24]}>
          <Col span={6} className="content-col">
            <Project />
            <AddTask />
          </Col>
          <Col span={6} className="content-col">
            <Project />
            <AddTask />
          </Col>
          <Col span={6} className="content-col">
            <Project />
            <AddTask />
          </Col>
          <Col span={6} className="content-col">
            <Project />
            <AddTask />
          </Col>
          <Col span={6} className="content-col">
            <Project />
            <AddTask />
          </Col>
        </Row>
      </div>
    </Content>
  );
}

export default ContentHome;