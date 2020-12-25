import React, { useState, useContext } from 'react';
import { Layout, Menu, Dropdown, Button, Input, Modal } from 'antd';
import { UserOutlined, LogoutOutlined, BarsOutlined } from '@ant-design/icons';

import { UserContext } from '../contexts/user';
import { LoginContext } from '../contexts/login';
import { UpdateProjectContext } from '../contexts/update';

const { Header } = Layout;
const { Search } = Input;

const axios = require('axios')

const Navbar = (props) => {
  const [isLogin, setIsLogin] = useContext(LoginContext);
  const [visible, setVisible] = useState(false);
  const [sidebarHide, setSidebarHide] = useState(true);
  const [user, setUser] = useContext(UserContext);
  const [updateProject, setUpdateProject] = useContext(UpdateProjectContext);
  const [newProject, setNewProject] = useState({
    leader_id: user && user.user_id,
    status: 0,
    work_counts: 0, 
    deleted: 0,
    created_date: new Date(Date.now()).toISOString().slice(0, 10)
  })

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    axios.post('http://localhost:8000/create/project',
    {
      ...newProject,
      leader_id: user.user_id
    },
    {
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      setUpdateProject(!updateProject);
      setVisible(false);
    })
    .catch((err) => {
      console.log(err);
      setVisible(false);
      alert(err)
    })
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

  const handleMenuClick = (e) => {
    if (e.key === '2') {
      axios.get('http://localhost:8000/auth/log-out',
        {
          withCredentials: true,
          credentials: 'include'
        })
        .then((res) => {
          if (res.status === 200) {
            setIsLogin(false);
            window.location.href = '/sign-in';
          }
        })
        .catch((err) => {
          alert(err);
        })
    } else {
      window.location.href = '/profile';
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick} className="ava-dropdown">
      <Menu.Item key="1" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

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
        <label>Name</label>
        <Input placeholder="Eg: Code" onChange={(e) => setNewProject({ ...newProject, name: e.target.value})} />
        <label>Deadline</label>
        <Input placeholder="Eg: 2020-03-19" onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value})}/>
        <label>Introduction</label>
        <Input placeholder="Eg: This is..." onChange={(e) => setNewProject({ ...newProject, introduction: e.target.value})}/>
      </Modal>

      <div style={{display: "flex", alignItems: "center", marginLeft: "1rem"}}>
        <Search placeholder="input search text" enterButton className="search-input" />
        <Dropdown overlay={menu} placement="bottomRight" arrow>
          <div className="avatar">
            <img src={user ? user.avatar : "https://avatars3.githubusercontent.com/u/53306165?s=460&u=706dee5c711d231bedc74f2692893c97be67b164&v=4"} />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
}

export default Navbar;