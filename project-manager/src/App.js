import './App.css';
import 'antd/dist/antd.css';
import './index.css';

import { useState } from 'react';
import Navbar from './components/Navbar';
import ContentHome from './components/home/Content';
import Login from './components/login/Login';
import Sidebar from './components/home/Sidebar';
import { Layout } from 'antd';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <Layout>
      <Sidebar />
      <Layout className="site-layout" style={{ marginLeft: 200, background: '#fff' }}>
        <Navbar />
        <ContentHome />
      </Layout>
    </Layout>
  );
}

export default App;
