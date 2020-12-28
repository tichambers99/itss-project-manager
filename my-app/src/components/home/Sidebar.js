import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  RightCircleOutlined
} from '@ant-design/icons';

import {CSSTransition} from 'react-transition-group';

import '../../style/style.css';

const { Sider } = Layout;

const Sidebar = (props) => {
  // const [currentKey, setCurrentKey] = useState('1')
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (e) => {
    // setCurrentKey(e.key)
    if (e.key === '1') {
      window.location.href = '/';
    } 
    else {
      window.location.href = '/progress'
    }
  }

  return (
    <CSSTransition
      in={props.sidebarHide}
      timeout={300}
      classNames="sidebar"
      unmountOnExit
    >
      <Sider
        width={window.screen.width <= 576 ? 100 : 180}
        collapsible 
        collapsed={collapsed} 
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <div className="logo" />
        <Menu 
          theme="dark" 
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[props.currentKey]}
          onClick={handleMenuClick}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<RightCircleOutlined />}>
            Progress
          </Menu.Item>
        </Menu>
      </Sider>
    </CSSTransition>  
  );
}

export default Sidebar;