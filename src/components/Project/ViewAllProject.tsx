"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Space, Spin, Modal, Form, Input } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useProjectStore } from "@/lib/store";

const ViewAllProject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const project = useProjectStore((state: any) => state.projects);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log("Received values of form:", values);
    // Here, you can make an API call to add the new task
    setIsModalVisible(false);
    form.resetFields();
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Team Members",
      dataIndex: "teamMembers",
      key: "teamMembers",
      render: (teamMembers) => teamMembers.join(", "),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            View
          </Button>
          <Button
            type="default"
            icon={<EditOutlined />}
            className="hover:bg-gray-200"
          >
            Edit
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-8">
      <div className="">
        <Button
          type="primary"
          onClick={showModal}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Add Task
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={project}
          columns={columns}
          rowKey="_id"
          bordered
          className="ant-table-bordered"
        />
      )}

      <Modal
        title="Add Task"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="projectName"
            label="Project Name"
            rules={[
              { required: true, message: "Please input the project name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Add Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewAllProject;
