import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/home/Navbar';
import ContentHome from './components/home/Content';
import Login from './components/login/Login';
import Sidebar from './components/home/Sidebar';
import ProfilePage from './components/user/ProfilePage';
import EditProfilePage from './components/user/EditProfilePage';

import { Layout } from 'antd';

import { LoginContext } from './components/contexts/login';
import { UserContext } from './components/contexts/user';
import { UpdateProjectContext } from './components/contexts/update';
import { UpdateTaskContext } from './components/contexts/update';

import './App.css';
import 'antd/dist/antd.css';
import './index.css';
import ProjectProgress from './components/home/ProjectProgress';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const [updateProject, setUpdateProject] = useState(false);
  const [updateTask, setUpdateTask] = useState(false);
  const [sidebarHide, setSideBarHide] = useState(true);

  const handleSidebar = (e) => {
    setSideBarHide(e);
  }
  
  return (
    <Router>
      <LoginContext.Provider value={[isLogin, setIsLogin]}>
        <UserContext.Provider value={[user, setUser]}>
          <UpdateProjectContext.Provider value={[updateProject, setUpdateProject]}>
            <UpdateTaskContext.Provider value={[updateTask, setUpdateTask]}>
              <Switch>
                <Route 
                  path="/sign-in"
                  component={Login}
                >  
                </Route>
                <Route exact path="/">
                  <Layout style={{ minHeight: '100vh' }}>
                    <Sidebar sidebarHide={sidebarHide} currentKey={"1"}/>
                    <Layout className="site-layout">
                      <Navbar onNavbar={(e) => handleSidebar(e)} />
                      <ContentHome />
                    </Layout>
                  </Layout>
                </Route>
                <Route exact path="/progress">
                  <Layout style={{ minHeight: '100vh' }}>
                    <Sidebar sidebarHide={sidebarHide} currentKey={"2"}/>
                    <Layout className="site-layout">
                      <Navbar onNavbar={(e) => handleSidebar(e)} />
                      <ProjectProgress />
                    </Layout>
                  </Layout>
                </Route>
                    
                <Route exact path="/profile">
                  <Layout>
                    <Sidebar sidebarHide={sidebarHide}/>
                    <Layout className = "site-layout" >
                      <Navbar onNavbar={(e) => handleSidebar(e)}/>
                      <ProfilePage />
                    </Layout> 
                  </Layout>
                </Route>
                <Route exact path="/profile/edit">
                  <Layout>
                    <Sidebar sidebarHide={sidebarHide}/>
                    <Layout className = "site-layout" >
                      <Navbar onNavbar={(e) => handleSidebar(e)}/>
                      <EditProfilePage />
                    </Layout> 
                  </Layout>
                </Route>
              </Switch>
            </UpdateTaskContext.Provider>
          </UpdateProjectContext.Provider>
        </UserContext.Provider>
      </LoginContext.Provider>
    </Router>
  );
}

export default App;
