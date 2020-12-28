import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  RightCircleOutlined
} from '@ant-design/icons';

import {CSSTransition} from 'react-transition-group';

import '../../style/style.css';

const { Sider } = Layout;

const Sidebar = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (e) => {}

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
          onClick={handleMenuClick}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/" >Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<RightCircleOutlined />}>
            <Link to="/progress" >Progress</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </CSSTransition>  
  );
}

export default Sidebar;