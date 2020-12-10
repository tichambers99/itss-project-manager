// import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ContentHome from './components/home/Content';
import ProfilePage from './components/user_profile/ProfilePage';
import EditProfilePage from './components/user_profile/EditProfilePage';
import Login from './components/login/Login';
import Sidebar from './components/Sidebar';
import { Layout} from 'antd';

import './App.css';
import 'antd/dist/antd.css';
import './index.css';

function App() {

    return ( < Router >
        <div>
            <Switch>
                <Route exact path = "/sign-in">
                    <Login/>
                </Route> 
                <Route exact path = "/">
                    <Layout>
                        <Sidebar/>
                        <Layout className = "site-layout" >
                            <Navbar/>
                            <ContentHome/>
                        </Layout> 
                    </Layout>
                </Route>
                <Route exact path = "/profile">
                    <Layout>
                        <Sidebar/>
                        <Layout className = "profile-layout" >
                            <Navbar/>
                            <ProfilePage idUser = "1"/>
                        </Layout> 
                    </Layout>
                </Route>
                <Route exact path = "/profile/edit">
                    <Layout>
                        <Sidebar/>
                        <Layout className = "edit-layout" >
                            <Navbar/>
                            <EditProfilePage idUser = "1"/>
                        </Layout> 
                    </Layout>
                </Route>
            </Switch >
        </div>  
        </Router > );
}

export default App;