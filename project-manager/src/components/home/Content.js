import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const ContentHome = () => {
  return (
    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
      <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
        Content
      </div>
    </Content>
  );
}

export default ContentHome;