import React, { Component } from 'react';
import { Layout, Row, Col, Upload, Button } from 'antd';
import dataUser from '../../fakeData/user.json';

import FormEdit from './FormEdit.js';

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
          data : dataUser,
          curAvatar : 'https://bootdey.com/img/Content/avatar/avatar7.png',
          selectedFile : null,
          selectedFileList: []
        }
    }

    changeAva = () => {
       this.setState({
           curAvatar :  this.state.selectedFile
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
                        curAvatar
                    }),
                );
                break;
          default:
                this.setState({
                    selectedFile : null,
                    selectedFileList : []
                });
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
                        <img alt="user_img" className="img-thumbnail isTooltip sizeAva" src={this.state.curAvatar} data-original-title="Usuario" /> 
                        <Upload fileList={this.state.selectedFileList} customRequest={dummyRequest}
                         onChange={this.onChange} >
                            <Button >Choose File</Button>
                        </Upload>
                    </Col>
                    <Col span={13}>
                        <FormEdit info = {rs}/>
                    </Col>
                </Row>
              </div>
          </Content>
        );
    }
}

export default EditProfilePage;