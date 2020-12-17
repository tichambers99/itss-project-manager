import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Button, Input, Modal } from 'antd';
import { UserOutlined, FolderOpenOutlined, LogoutOutlined, BarsOutlined } from '@ant-design/icons';
import {
  NavLink,
}from 'react-router-dom';

const { Header } = Layout;
const { Search } = Input;

const menu = (
  <Menu className="ava-dropdown">
    <Menu.Item key="1" icon={<UserOutlined />}>
      <NavLink to ='/profile'>Profile</NavLink>
    </Menu.Item>
    <Menu.Item key="2" icon={<FolderOpenOutlined />}>
      <NavLink to ='/'>Project</NavLink>
    </Menu.Item>
    <Menu.Item key="3" icon={<LogoutOutlined />}>
      <NavLink to ='/sign-in'>LogOut</NavLink>
    </Menu.Item>
  </Menu>
);

const Navbar = (props) => {
  const [visible, setVisible] = useState(false);
  const [sidebarHide, setSidebarHide] = useState(true);
  // let sidebarHide = false;
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleBarClick = () => {
    // if (window.screen.width <= 768) {
      setSidebarHide(!sidebarHide)
      props.onNavbar(!sidebarHide)
    // }
  }

  return (
    <Header className="site-layout-background">
      <div style={{display: "flex", alignItems: "center"}}>
        <BarsOutlined  onClick={() => handleBarClick()} />
        <Button className="add-new-btn" onClick={() => showModal()}>
          Add new
        </Button>
      </div>
      <Modal
        title="Add new project"
        visible={visible}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
      >
        <Input placeholder="Enter title" />
      </Modal>
      <div style={{display: "flex", alignItems: "center", marginLeft: "1rem"}}>
        <Search placeholder="input search text" enterButton className="search-input" />
        <Dropdown overlay={menu} placement="bottomRight" arrow>
          <div className="avatar">
            <img src="https://avatars3.githubusercontent.com/u/53306165?s=460&u=706dee5c711d231bedc74f2692893c97be67b164&v=4" />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
}

export default Navbar;