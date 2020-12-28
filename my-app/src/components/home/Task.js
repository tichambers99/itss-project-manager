import React, { useContext, useEffect, useRef, useState } from 'react';

import { Card, Modal, Button, Input, Upload, Popconfirm, Tooltip, Popover } from 'antd';
import { 
  DeleteOutlined, 
  InfoCircleOutlined, 
  BellOutlined, 
  PlusOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined
} from '@ant-design/icons';

import Logo from '../../images/logo.png';
import { UpdateProjectContext, UpdateTaskContext } from '../contexts/update';
import { UserContext } from '../contexts/user';

const { TextArea } = Input;

const axios = require('axios')

const Task = (props) => {
  const [tasks, setTasks] = useState([]);
  // const [key, setKey] = useState(0);
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
  const modalKey = useRef(null)

  const [updateTask, setUpdateTask] = useContext(UpdateTaskContext)
  const [updateProject, setUpdateProject] = useContext(UpdateProjectContext);
  const [user, setUser] = useContext(UserContext)

  const { id, name, leader_id, members, allMembers } = props.projectInfo
  const { option } = props;
  let filterTasks = []
  if (option === 1) {
    filterTasks = tasks.filter((task) => task.status === 1)
  }
  else if (option === 0) {
    filterTasks = tasks.filter((task) => task.status === 0)
  } 
  else {
    filterTasks = tasks;
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`http://localhost:8000/project/task/${id}`,
        {
          withCredentials: true,
          credentials: 'include'
        })
        setTasks([...res.data.Tasks])
      } catch (err) {
        alert(err)
      }
    })()
  }, [updateTask, id])

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
    // setKey(value)
    modalKey.current = value
    try {
      const res = await axios.get(`http://localhost:8000/comment/${value}`,
      {
        withCredentials: true,
        credentials: 'include'
      })
      res.data.result.length !== 0 && setComments(res.data.result)
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
      projectId: id
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
      await axios.post(`http://localhost:8000/comment/create`,
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
      await axios.get(`http://localhost:8000/comment/delete/${commentId}`,
      {
        withCredentials: true,
        credentials: 'include'
      })
    } catch (err) {
      alert(err)
    }
  }

  const handleAddMember = async (e, userId) => {
    try {
      await axios.post(`http://localhost:8000/project/member/add`,
      {
        joined_date: new Date(Date.now()).toISOString().slice(0, 10),
        leader: leader_id,
        user_id: userId,
        project_id: id
      },
      {
        withCredentials: true,
        credentials: 'include'
      })
      setUpdateProject(!updateProject);
    } catch (err) {
      alert(err)
    }
  }

  const handleRemoveMember = async (e, userId) => {
    try {
      await axios.get(`http://localhost:8000/project/member/remove/${userId}`,
      {
        withCredentials: true,
        credentials: 'include'
      })
      setUpdateProject(!updateProject);
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

  let notMembers = []
  let isMembers = []
  for (const allMember of allMembers) {
    let flag = true;
    for (const member of members) {
      if (allMember.id === member.id) {
        flag = false;
        isMembers.push(allMember)
        break;
      }
    }
    flag && notMembers.push(allMember)
  }

  const popOverLeftMembers = (
    <ul className="all-members" style={{ marginBottom: 0 }}>
      {
        notMembers.map((member, key) => 
          <li key={key} onClick={(e, userId = member.id) => handleAddMember(e, userId)}>
            <Tooltip title={member.username}>
              <img alt="avatar" src={member.avatar ? member.avatar : Logo} />
            </Tooltip>
          </li>
        )
      }
    </ul>
  )

  const popOverIsMembers = (
    <ul className="all-members" style={{ marginBottom: 0 }}>
      {
        isMembers.map((member, key) => 
          <li key={key} onClick={(e, userId = member.id) => handleRemoveMember(e, userId)}>
            <Tooltip title={member.username}>
              <img alt="avatar" src={member.avatar ? member.avatar : Logo} />
            </Tooltip>
          </li>
        )
      }
    </ul>
  )

  return (
    <div>
      {
        filterTasks.map((task, key) => {
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
        filterTasks.filter(task => task.id === modalKey.current).map((task, key) => 
          <Modal
            key={key}
            ref={modalKey}
            visible={visible}
            title={
              <div className="task-title"> 
                <h3>Task: { task.name }</h3>
                <p className="task-subtitle">Project: {name}</p>
                <p className="task-member">Member</p>
                <div className="member">
                  {
                    members.map((member, key) => {
                      return (
                        <Tooltip title={member.username} key={key}>
                          <img alt="avatar" src={member.avatar ? member.avatar : Logo} />
                        </Tooltip>
                      )
                    })
                  }
                  <Popover content={popOverLeftMembers} title="Members left" trigger="click">
                    <PlusCircleOutlined className="member-icon" />
                  </Popover>
                  <Popover content={popOverIsMembers} title="All members" trigger="click">
                    <MinusCircleOutlined className="member-icon" />
                  </Popover>
                </div>
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
            <div className="task-description">
              <p className="task-desc-title">Description</p>
              <p>{task.introduction && task.introduction}</p>
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
                comments.length !== 0 ? 
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