import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import { IUser } from "../interface/auth";

const Signup: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const onFinish = async (data: IUser) => {
    await signup(data)
    api["success"]({
      message: "Register successful!",
    });
    setTimeout(function () {
      navigate("/login")
    },1500)
  };

  // const validatePassword = (value:any) => {
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  //   if (!passwordRegex.test(value)) {
  //     return Promise.reject('Password must contain at least 8 characters');
  //   }
  //   return Promise.resolve();
  // };

  const validateMessages = {
    required: 'Must be not empty!',
    types: {
      email: 'Email is not a valid!',
    }
  };

  return (
    <div className="login">
      <div className="form-login">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // validateMessages={validateMessages}
        >
          <Form.Item
            name="username"
            rules={[{ required: true }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, type:"email" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              type="email"
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true },
              // { validator: validatePassword },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item> */}

          <Form.Item>
            {contextHolder}
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
            <span style={{ color: "#fff" }}>Have an account </span>{" "}
            <a href="/login">Login now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
