import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import TableInfo from "./TableInfo";
import dataUser from '../../fakeData/user.json';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const { Content } = Layout;

class ProfilePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      data : dataUser
    }
  
  }

  render() {
    var rs;
    this.state.data.map((value, key) => {
      if(key + 1 == this.props.idUser){
        rs = value;
        return 0;
      }
    })
    return (
          <Content>
              <div className="inf-page">
                <Row>
                    <Col span={6} offset={2} className="text-center">
                      <img alt="user_img" className="img-thumbnail isTooltip sizeAva" src={rs.avatar} data-original-title="Usuario" /> 
                    </Col>
                    <Col span={13}>
                      <Row>
                        <Col span={16} className="text-left">
                          <h1 className="acc_name">Profile</h1>
                        </Col>
                        <Col span={8} className="text-right" style={{marginTop: '5px'}}>
                          <Link to = "/profile/edit" className="btn btn-outline-secondary" href="abc.com" role="button">
                            <i className="fas fa-user-edit" />
                            Edit
                          </Link>
                        </Col>
                      </Row>
                      <TableInfo name={rs.name} mail = {rs.email}
                                 phone = {rs.phone} address= {rs.address}
                                 github = {rs.github} birthday = {rs.date} />
                  </Col>
                </Row>
              </div>
          </Content>
          
        );
      }
}

export default ProfilePage;