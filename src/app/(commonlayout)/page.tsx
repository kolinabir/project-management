"use client";

import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import Link from "next/link";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    if (values.username === "admin" && values.password === "password") {
      message.success("Logged in successfully!");
      // Redirect the user to the dashboard or any other page
    } else {
      message.error("Invalid username or password");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="w-full max-w-xs">
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Log in
            </Button>
          </Form.Item>
        </Form>
        <Link href={"/dashboard"}>Go to Dashboard</Link>
      </div>
    </div>
  );
};

export default LoginForm;
