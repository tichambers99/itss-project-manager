import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/home/Navbar';
import ContentHome from './components/home/Content';
import Login from './components/login/Login';
import Sidebar from './components/home/Sidebar';
import { Layout } from 'antd';

import {LoginContext} from './components/contexts/login';

import './App.css';
import 'antd/dist/antd.css';
import './index.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [sidebarHide, setSideBarHide] = useState(true)

  const handleSidebar = (e) => {
    setSideBarHide(e);
  }

  return (
    <Router>
      <LoginContext.Provider value={[isLogin, setIsLogin]}>
        <div>
          <Switch>
            <Route exact path="/sign-in">
              <Login />
            </Route>
            <Route exact path="/">
              <Layout style={{ minHeight: '100vh' }}>
                <Sidebar sidebarHide={sidebarHide} />
                <Layout className="site-layout">
                  <Navbar onNavbar={(e) => handleSidebar(e)} />
                  <ContentHome />
                </Layout>
              </Layout>
            </Route>
          </Switch>
        </div>
      </LoginContext.Provider>
    </Router>
  );
}

export default App;
