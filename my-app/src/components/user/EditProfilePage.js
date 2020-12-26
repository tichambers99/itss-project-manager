import React, { Component } from 'react';
import { Layout, Row, Col, Upload, Button } from 'antd';
const axios = require('axios')

const { Content } = Layout;

const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
};

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    if (img) {
        reader.readAsDataURL(img);
    }
}

class EditProfilePage extends Component {
    constructor(props){
        super(props);
        this.state = {
          user: {},
          selectedFile : null,
          selectedFileList: [],
          loading: false    // for button loading
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
            user: {
                ...res.data.result[0],
                date: res.data.result[0].date.slice(0, 10)
            }
          })
        })
        .catch((err) => {
          console.log(err);
          alert(err)
        })
      }

    changeAva = () => {
       this.setState({
            user:  {
               ...this.state.user,
               avatar: this.state.selectedFile
            }
       });
    }
    
    onChange = info => {   
        switch (info.file.status) {
            case "uploading":
                this.setState({
                    selectedFileList : [info.file]
                });
                break;
            case "done":
                this.setState({
                        selectedFile : info.file,
                        selectedFileList : [info.file]
                });
                getBase64(info.file.originFileObj, curAvatar =>
                    this.setState({
                        user:  {
                           ...this.state.user,
                           avatar: curAvatar
                        }
                   })
                );
                break;
            default:
                this.setState({
                    selectedFile : null,
                    selectedFileList : []
                });
        }
    }

    handleEditInfor = () => {
        this.setState({
            loading: true
        });
        axios.post('http://localhost:8000/users/edit',
        {
            ...this.state.user
        },
        {
          withCredentials: true,
          credentials: 'include'
        })
        .then((res) => {
          alert(res.data.message);
          this.setState({
            loading: false
          })
        })
        .catch((err) => {
          this.setState({
            loading: false
          })
          console.log(err);
          alert(err)
        })
    }
    
    render() {
        const { avatar, username, date, email, phone, address, github } = this.state.user;
        const { user } = this.state;
        
        return (
            <Content>
              <div className="inf-page">
                <Row>
                    <Col span={6} offset={2} className="text-center">
                        { avatar && <img alt="user_img" className="img-thumbnail isTooltip sizeAva" src={user.avatar} data-original-title="Usuario" /> }
                        <Upload fileList={this.state.selectedFileList} customRequest={dummyRequest}
                         onChange={this.onChange} >
                            <Button >Choose File</Button>
                        </Upload>
                    </Col>
                    <Col span={13}>
                        <Row >
                            <Col span={16} className="text-left">
                            <h1>Edit</h1>
                            </Col>
                            <Col span={8} className="text-right" style={{marginTop: '5px'}}>
                                <Button 
                                    type="primary"
                                    loading={this.state.loading}
                                    onClick={this.handleEditInfor}
                                    href="/profile"
                                >
                                    <i className="fas fa-save" style={{marginRight: "0.25em"}}></i>Save
                                </Button>
                            </Col>
                        </Row>
                        <form>
                            <div className="form-group">
                                <Col span={8}>Name</Col>
                                <Col span={24}>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        defaultValue={username} 
                                        onChange={(e) => user.username = e.target.value}
                                        
                                    />
                                </Col>
                            </div>
                            <div className="form-group">
                                <Col span={8}>Birthday</Col>
                                <Col span={24}>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        defaultValue={date} 
                                        onChange={(e) => user.date = e.target.value}
                                    />
                                </Col>
                            </div>
                            <div className="form-group">
                                <Col span={6}>Email</Col>
                                <Col span={24}>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        defaultValue={email} 
                                        onChange={(e) => user.email = e.target.value}
                                    />
                                </Col>
                            </div>
                            <div className="form-group">
                                <Col span={6}>Phone</Col>
                                <Col span={24}>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        defaultValue={phone} 
                                        onChange={(e) => user.phone = e.target.value}
                                    />
                                </Col>
                            </div>
                            <div className="form-group">
                                <Col span={6}>Address:</Col>
                                <Col span={24}>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        defaultValue={address} 
                                        onChange={(e) => user.address = e.target.value}
                                    />
                                </Col>
                            </div>
                            <div className="form-group">
                                <Col span={6}>Github:</Col>
                                <Col span={24}>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        defaultValue={github} 
                                        onChange={(e) => user.github = e.target.value}
                                    />
                                </Col>
                            </div>
                        </form>
                  </Col>
                </Row>
              </div>
          </Content>
        );
    }
}

export default EditProfilePage;