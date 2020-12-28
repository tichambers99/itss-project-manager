import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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
                  render={() => <Login />}
                />

                <Layout style={{ minHeight: '100vh' }}>
                  <Sidebar sidebarHide={sidebarHide} />
                  <Layout className="site-layout">
                    <Navbar onNavbar={(e) => handleSidebar(e)} />
                    <Switch>
                      <Route 
                        exact path="/" 
                        render={() => <ContentHome />}
                      />

                      <Route 
                        path="/progress" 
                        component={ProjectProgress}
                      />
                          
                      <Switch>
                        <Route 
                          exact path="/profile" 
                          component={ProfilePage}
                        />
                        <Route 
                          path="/profile/edit" 
                          component={EditProfilePage}
                        />
                      </Switch>
                    </Switch>
                  </Layout>
                </Layout>            
              </Switch>
            </UpdateTaskContext.Provider>
          </UpdateProjectContext.Provider>
        </UserContext.Provider>
      </LoginContext.Provider>
    </Router>
  );
}

export default App;
