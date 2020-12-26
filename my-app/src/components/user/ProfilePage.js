import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import TableInfo from "./TableInfo";
import {
  Link
} from "react-router-dom";

import Logo from '../../logo.svg'

const { Content } = Layout;
const axios = require('axios')

class ProfilePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      user : {}
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/users',
    {
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      this.setState({
        user: res.data.result[0]
      })
    })
    .catch((err) => {
      console.log(err);
      alert(err)
    })
  }

  render() {
    const { user } = this.state;
   
    return (
      <Content>
        <div className="inf-page">
          <Row>
            <Col span={6} offset={2} className="text-center">
              <img alt="user_img" className="img-thumbnail isTooltip sizeAva" src={user.avatar ? user.avatar : Logo} data-original-title="Usuario" />
            </Col>
            <Col span={13}>
              <Row>
                <Col span={16} className="text-left">
                  <h1 className="acc_name">Profile</h1>
                </Col>
                <Col span={8} className="text-right" style={{marginTop: '5px'}}>
                  <Link 
                    to = "/profile/edit" 
                    className="btn btn-outline-secondary" 
                    role="button"
                  >
                    <i className="fas fa-user-edit" />
                    Edit
                  </Link>
                </Col>
              </Row>
              <TableInfo user={user} />
          </Col>
          </Row>
        </div>
      </Content>
    );
  }
}

export default ProfilePage;