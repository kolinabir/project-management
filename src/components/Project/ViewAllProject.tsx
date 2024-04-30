"use client";
import React, { useState } from "react";
import { Table, Button, Space, Modal, Form, Input, Tag } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useProjectStore } from "@/lib/store";
import Link from "next/link";

const ViewAllProject = () => {
  const projects = useProjectStore((state) => state.projects);
  
  const addProject = useProjectStore((state) => state.addProject);
  const editProject = useProjectStore((state) => state.updateProject);
  const deleteProject = useProjectStore((state) => state.removeProject);
  const addMemberToProject = useProjectStore(
    (state) => state.addMemberToProject
  );
  const removeMemberFromProject = useProjectStore(
    (state) => state.removeMemberFromProject
  );

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isEditTeamMembersModalVisible, setIsEditTeamMembersModalVisible] =
    useState(false);

  const [form] = Form.useForm();

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const showEditTeamMembersModal = () => {
    setIsEditTeamMembersModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setIsEditTeamMembersModalVisible(false);
    form.resetFields();
  };

  const onFinishAdd = (values) => {
    setIsAddModalVisible(false);
    const newProject = {
      name: values.projectName,
      description: values.description,
    };
    addProject(newProject);
    form.resetFields();
  };

  const onFinishEdit = (values) => {
    setIsEditModalVisible(false);
    const editedProject = {
      _id: form.getFieldValue("_id"), // Get the project ID from the form
      name: values.projectName,
      description: values.description,
    };
    editProject(editedProject._id, editedProject); // Pass the project ID
    form.resetFields();
  };

  const onFinishEditTeamMembers = (values) => {
    setIsEditTeamMembersModalVisible(false);
    // Logic to edit team members goes here
  };

  const addMember = (projectId, member) => {
    addMemberToProject(projectId, member);
  };

  const removeMember = (projectId, member) => {
    removeMemberFromProject(projectId, member);
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
      render: (teamMembers, record) => (
        <div className="flex flex-wrap items-center gap-2">
          {teamMembers?.map((member) => (
            <Tag
              closable
              onClose={() => removeMember(record._id, member)}
              key={member}
              className="bg-blue-500 text-white"
            >
              {member}
            </Tag>
          ))}
          <Input
            placeholder="Add a member"
            onPressEnter={(e) => addMember(record._id, e.target.value)}
            className="w-full sm:w-auto"
          />
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="flex flex-col sm:flex-row">
          <div>
            <Link className="" href={`/dashboard/projectmanage/${record._id}`}>
              <Button
                type="primary"
                icon={<EyeOutlined />}
                className="bg-blue-500 hover:bg-blue-600 text-white mb-2 sm:mb-0"
              >
                View
              </Button>
            </Link>
          </div>
          <Button
            type="default"
            icon={<EditOutlined />}
            className="hover:bg-gray-200 mb-2 sm:mb-0"
            onClick={() => {
              showEditModal();
              form.setFieldsValue(record); // Populate form fields with project data
            }}
          >
            Edit
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={() => deleteProject(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-4">
        <Button
          type="primary"
          onClick={showAddModal}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Add Project
        </Button>
      </div>
      <Table
        dataSource={projects}
        columns={columns}
        rowKey="_id"
        bordered
        className="ant-table-bordered"
        scroll={{ x: true }}
      />
      {/* Add Project Modal */}
      <Modal
        title="Add Project"
        visible={isAddModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinishAdd}>
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
              Add Project
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Edit Project Modal */}
      <Modal
        title="Edit Project"
        visible={isEditModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinishEdit}>
          <Form.Item
            name="_id" // Hidden field to store project ID
            hidden
          >
            <Input />
          </Form.Item>
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
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewAllProject;
