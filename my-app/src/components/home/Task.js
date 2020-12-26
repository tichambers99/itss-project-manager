import React, { useContext, useEffect, useRef, useState } from 'react';

import { Card, Modal, Button, Input, Upload, Popconfirm } from 'antd';
import { DeleteOutlined, InfoCircleOutlined, BellOutlined, PlusOutlined } from '@ant-design/icons';

import Logo from '../../images/logo.png';
import { UpdateTaskContext } from '../contexts/update';
import { UserContext } from '../contexts/user';

const { TextArea } = Input;

const axios = require('axios')

const Task = (props) => {
  const [tasks, setTasks] = useState([]);
  const [key, setKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [fileImg, setFileImg] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: []
  });

  const inputEl = useRef(null);

  const [updateTask, setUpdateTask] = useContext(UpdateTaskContext)
  const [user, setUser] = useContext(UserContext)

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

  // Handle upload image
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
  // end handle upload image

  const showModal = async (e, value) => {
    setKey(value)
    try {
      const res = await axios.get(`http://localhost:8000/comment/${value}`,
      {
        withCredentials: true,
        credentials: 'include'
      })
      setComments(res.data.result)
    } catch (err) {
      alert(err)
    }
    setVisible(true);
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

  const handleDeleteTask = (e, taskId) => {
    setLoadingDelete(true);    
    axios.post(`http://localhost:8000/delete/task/${taskId}`,
    {
      projectId: props.projectInfo.id
    },
    {
      withCredentials: true,
      credentials: 'include'
    })
    .then((res) => {
      setUpdateTask(!updateTask)
      setLoadingDelete(false);
      setVisible(false);
    })
    .catch((err) => {
      console.log(err);
      alert(err.response);
      setLoadingDelete(false);
      setVisible(false);
    })
  }

  const handleAddComment = async (e, taskId) => {
    const newComment = {
      avatar: user.avatar,
      content: inputEl.current.state.value,
      date: new Date(Date.now()).toISOString().slice(0, 10),
      task_id: taskId,
      title: "good",
      username: user.username
    }
    setComments([
      ...comments,
      newComment
    ])

    try {
      const res = await axios.post(`http://localhost:8000/comment/create`,
      {
        content: inputEl.current.state.value,
        date: new Date(Date.now()).toISOString().slice(0, 10),
        task_id: taskId,
        title: "good",
        user_id: user.user_id,
        deleted: 0
      },
      {
        withCredentials: true,
        credentials: 'include'
      })
    } catch (err) {
      alert(err)
    }
  }

  const handleDeleteComment = async (e, commentId) => {
    const notDeleteComments = comments.filter((comment) => comment.id !== commentId)
    setComments(notDeleteComments);
    try {
      const res = await axios.get(`http://localhost:8000/comment/delete/${commentId}`,
      {
        withCredentials: true,
        credentials: 'include'
      })
    } catch (err) {
      alert(err)
    }
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
              cover={
                <img
                  alt="task_img"
                  src={task.image ? task.image : Logo}
                />
              }
              actions={[
                <InfoCircleOutlined key="info" onClick={(e, value=task.id) => showModal(e, value)} />,
                <BellOutlined key="bell"/>,    
              ]}
            >
              <p>{task.name}</p>
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
            footer={
              <div>
                <Button 
                  type="primary" 
                  onClick={(e, taskId = task.id) => handleOk(e, taskId)}
                  loading={loading}
                >
                  OK
                </Button>
                <Popconfirm
                  title="Are you sure to delete this task?"
                  onConfirm={(e, taskId = task.id) => handleDeleteTask(e, taskId)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button 
                    danger
                    loading={loadingDelete}
                  >
                    Delete
                  </Button>
                </Popconfirm>
                <Button onClick={handleCancel}>Cancel</Button>
              </div>
            }
            onCancel={handleCancel}
          >
            <p>{task.introduction && task.introduction}</p>
            <div className="task-description">
              <p className="task-desc-title">Description</p>
              <TextArea 
                autoSize
                autoFocus
                bordered
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
              {
                comments ? 
                comments.map((comment, key) => {
                  return (
                    <div className="user-comment" key={key} >
                      <DeleteOutlined 
                        className="delete-comment"
                        onClick={(e, commentId = comment.id) => handleDeleteComment(e, commentId)}
                      />
                      <div className="user-info">
                        <div className="user-avatar">
                          <img src={comment.avatar ? comment.avatar : Logo} alt="avatar" />
                        </div>
                        <div className="user-subinfo">
                          <p className="user-name">{comment.username}</p>
                          <p className="time-comment">{comment.date.slice(0, 10)}</p>
                        </div>
                      </div>
                      <p>{comment.content}</p>
                    </div>
                  )
                })
                :
                <p>No comment yet</p>
              }
              <Input 
                placeholder="Add a comment.." 
                ref={inputEl}
              />
              <Button 
                type="primary"
                style={{ marginTop: 8}}
                onClick={(e, taskId=task.id) => handleAddComment(e, taskId)}
              >
                Add
              </Button>
            </div>
          </Modal>
        )
      }
    </div>
  );
}

export default Task;