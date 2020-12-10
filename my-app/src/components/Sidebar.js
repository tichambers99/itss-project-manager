import React from 'react';
import { Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import '../style/style.css';

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          Video
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          Upload
        </Menu.Item>
        <Menu.Item key="4" icon={<BarChartOutlined />}>
          Chat
        </Menu.Item>
        <Menu.Item key="5" icon={<CloudOutlined />}>
          Cloud
        </Menu.Item>
        <Menu.Item key="6" icon={<AppstoreOutlined />}>
          App Store
        </Menu.Item>
        <Menu.Item key="7" icon={<TeamOutlined />}>
          Team
        </Menu.Item>
        <Menu.Item key="8" icon={<ShopOutlined />}>
          Shopping
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;