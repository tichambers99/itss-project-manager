import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const ContentHome = () => {
  return (
    <Content>
      <div className="site-layout-background content-background" style={{ padding: 24, textAlign: 'center' }}>
        Content
      </div>
    </Content>
  );
}

export default ContentHome;