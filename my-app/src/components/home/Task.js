import React, { useContext, useEffect, useState } from 'react';

import { Card, Modal, Button, Input, Upload } from 'antd';
import { CommentOutlined, EllipsisOutlined, BellOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';

import Logo from '../../images/logo.png';
import { UpdateTaskContext } from '../contexts/update';

const axios = require('axios')

const Task = (props) => {
  const [tasks, setTasks] = useState([]);
  const [key, setKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [updateTask, setUpdateTask] = useContext(UpdateTaskContext)
  const [fileImg, setFileImg] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: []
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/project/${props.projectInfo.id}`,
    {
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      setTasks([...res.data.Tasks])
    })
    .catch((err) => {
      console.log(err);
      alert(err.response);
    })
  }, [updateTask])

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handleImgCancel = () => setFileImg({ previewImage: false });
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setFileImg({
      ...fileImg,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  const handleChange = (({ fileList }) => {
    setFileImg({ fileList })
  });

  const showModal = (e, value) => {
    setKey(value)
    setVisible(true);
  };

  const handleOk = (e, taskId) => {
    let modifyTask = tasks.filter(task => task.id === taskId)
    modifyTask[0].image = fileImg.fileList[0] && fileImg.fileList[0].thumbUrl;

    setLoading(true);    
    axios.post(`http://localhost:8000/update/task/${taskId}`,
    {
      ...modifyTask[0]
    },
    {
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      setLoading(false);
      setUpdateTask(!updateTask)
      setVisible(false);
    })
    .catch((err) => {
      console.log(err);
      alert(err.response);
      setLoading(false);
      setVisible(false);
    })
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChangeDescrip = (e, taskId) => {
    const notChangeTasks = tasks.filter(task => task.id !== taskId)
    let modifyTask = tasks.filter(task => task.id === taskId)
    modifyTask[0].introduction = e.target.value
    setTasks([
      ...notChangeTasks,
      modifyTask[0]
    ])
  }
  
  const { previewVisible, previewImage, fileList, previewTitle } = fileImg;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      {
        tasks.map((task, key) => {
          return (
            <Card
              key={key}
              className="card"
              onClick={(e, value=task.id) => showModal(e, value)}
              cover={
                <img
                  alt="task_img"
                  src={task.image ? task.image : Logo}
                />
              }
              actions={[
                <BellOutlined key="bell"/>,
                <CommentOutlined key="comment" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <p>{task.introduction}</p>
            </Card>
          )
        })
      }
      {
        tasks.filter(task => task.id === key).map((task, key) => 
          <Modal
            key={key}
            visible={visible}
            title={
              <div className="task-title"> 
                <h3>{ task.name }</h3>
                <p className="task-subtitle">{props.projectInfo.name}</p>
                <p className="task-member">Member</p>
              </div>
            }
            onOk={(e, taskId = task.id) => handleOk(e, taskId)}
            onCancel={() => handleCancel()}
          >
            <p>{task.introduction && task.introduction}</p>
            <div className="task-description">
              <p className="task-desc-title">Description</p>
              <Input 
                size="large" 
                placeholder="Add description" 
                onChange={(e, taskId=task.id) => handleChangeDescrip(e, taskId)}
              />
            </div>
            <div className="task-attachment">
              <p className="task-attach-title">Add attachment</p>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleImgCancel}
              >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
            <div className="task-comment">
              <p className="task-com-title">Comment</p>
              <div className="user-comment">
                <div className="user-info">
                  <div className="user-avatar">
                    <img src="https://avatars3.githubusercontent.com/u/53306165?s=460&u=706dee5c711d231bedc74f2692893c97be67b164&v=4" alt="avatar" />
                  </div>
                  <div className="user-subinfo">
                    <p className="user-name">Username</p>
                    <p className="time-comment">5 hours ago</p>
                  </div>
                </div>
                <p>Comment.....</p>
              </div>
            </div>
          </Modal>
        )
      }
    </div>
  );
}

export default Task;