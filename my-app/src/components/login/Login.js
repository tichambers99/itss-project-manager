import React, {useState} from 'react';
import { Input, Space, Button, Modal, Form, Checkbox, Select } from 'antd';
import { Link } from "react-router-dom";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../../images/logo.png';

import '../../style/log.css';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Login = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="login">
        <img src={logo} /> 
      <Space direction="vertical" className="form-login">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              size="large" 
              prefix={<UserOutlined 
              className="site-form-item-icon" />} 
              placeholder="Username" 
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item className="form-checkbox-forgot">
            <Form.Item name="remember" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <span className="form-subspan">
              <Link to="/forgot-password">Forgot password?</Link>
            </span>
          </Form.Item>

          <Form.Item className="form-login-register">
            <Button type="primary" htmlType="submit" className="btn-signin login-form-button">
              Log in
            </Button> 
            <span onClick={() => showModal()} className="form-subspan">
               Or Register now!
            </span>
            <Modal
              title="Sign Up"
              visible={visible}
              onCancel={() => handleCancel()}
              footer={null}
            >
              <Form
                {...formItemLayout}
                form={form}
                name="register"
                initialValues={{
                  prefix: '84',
                }}
                scrollToFirstError
              >
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject('The two passwords that you entered do not match!');
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your phone number!',
                    },
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    style={{
                      width: '100%',
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                    },
                  ]}
                  {...tailFormItemLayout}
                >
                  <Checkbox>
                    I have read the <a href="">agreement</a>
                  </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout} style={{marginTop: "1rem"}}>
                  <Button 
                    htmlType="button" 
                    onClick={() => handleCancel()}
                  > 
                    Cancel 
                  </Button>
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    style={{marginLeft: "2rem"}}
                  >
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
}

export default Login;