import { Form, Input, Button, DatePicker } from 'antd';
import React, {useState} from 'react';
import moment from 'moment';
import {
  Link
} from "react-router-dom";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const tailLayout = {
  labelCol:{
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const backLayout = {
  wrapperCol:{
    span:2,
    offset:22,
  },
};

const dateFormat = 'DD-MM-YYYY';

const FormEdit = (props) => {

  const [form] = Form.useForm();

  const { getFieldDecorator, getFieldValue } = form;

  const [rq, setRq] = useState(true);

  const onFinish = () => {
    console.log(form.getFieldValue());
  }

  const onReset = () => {
    form.resetFields();
  };

  return (
      <Form {...layout} form={form} name="control-hooks" labelAlign="left"
        initialValues={{
          ["name"]: props.info.name,
          ["mail"]: props.info.email,
          ["address"]: props.info.address,
          ["birthday"]: moment(props.info.date, dateFormat),
          ["phone"]: props.info.phone,
          ["password"]: props.info.pass,
          ["confirm"]: '',
        }}
      >
         <Form.Item {...backLayout} >
           <Link to ="/profile">
              <Button  span = {3} offset={21} type="primary" > 
                Back
              </Button>
           </Link>
        </Form.Item>
        <Form.Item name="name" label="UserName" rules={[{ 
              required: rq, 
              message: 'Please input your user name!' 
            }]} >
          <Input placeholder = "name" />
        </Form.Item>
        <Form.Item name="mail" label="Mail" rules={[{ 
              required: rq, 
              message: 'Please input your mail address!' 
            }]}>
          <Input placeholder = "mail" />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ 
              required: rq, 
              message: 'Please input your Address' 
            }]}>
          <Input placeholder = "address" />
        </Form.Item>
        <Form.Item name ="birthday" label="BirthDay" rules={[{ 
              required: rq, 
              message: 'Please input your birthday!' 
            }]}>
          <DatePicker style={{width:'100%'}}/>
        </Form.Item>
        <Form.Item name="phone" label="Phone Number"
            rules={[{ 
              required: rq, 
              message: 'Please input your phone number!' 
            }]}>
            <Input placeholder = "phone" style={{ width: '100%' }}/>
        </Form.Item>

        <Form.Item name="password" label="Password"
          rules={[
            {
              required: rq,
              message: 'Please input your password!',
              type : "regexp",
              pattern: new RegExp(/\d+/g),
            },
          ]}
        hasFeedback>
          <Input.Password placeholder = "password" />
        </Form.Item>

        <Form.Item name="confirm" label="Confirm Password" dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: rq,
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
          <Input.Password placeholder = "confirm" />
        </Form.Item>

        <Form.Item {...tailLayout} label = "Action">
            <Button htmlType="button" onClick={onReset} type="primary" danger>
              Reset
            </Button>
            <Button htmlType ="submit"  type="primary" style={{marginLeft:'10px'}} onClick = {onFinish}> 
              Save
            </Button>
        </Form.Item>
        
    </Form>
  );
};

export default FormEdit;