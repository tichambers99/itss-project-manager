import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ContentHome from './components/home/Content';
import Login from './components/login/Login';
import Sidebar from './components/home/Sidebar';
import { Layout } from 'antd';

import './App.css';
import 'antd/dist/antd.css';
import './index.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/sign-in">
            <Login />
          </Route>
          <Route exact path="/">
            <Layout>
              <Sidebar />
              <Layout className="site-layout">
                <Navbar />
                <ContentHome />
              </Layout>
            </Layout>
          </Route>
        </Switch>
      </div> 
    </Router>
  );
}

export default App;
