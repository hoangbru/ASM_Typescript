import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useForm } from "react-hook-form";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interface/auth";

const Login: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const onFinish = async (data: IUser) => {
    try {
      const { data: user } = await login(data);
      localStorage.setItem("user", JSON.stringify(user));
      api["success"]({
        message: "Login successful!",
      });
      setTimeout(function () {
        navigate("/");
      },1500)
    } catch (error) {
      console.log(error);
    }
  };

  const validateMessages = {
    required: 'Must be not empty!',
    types: {
      email: 'Email is not a valid!',
    }
  };

  // const validatePassword = (value:any) => {
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
  //   if (!passwordRegex.test(value)) {
  //     return Promise.reject('Password must contain at least 8 characters');
  //   }
  //   return Promise.resolve();
  // };

  return (
    <div className="login">
      <div className="form-login">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
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
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
          {contextHolder}
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="/signup">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
