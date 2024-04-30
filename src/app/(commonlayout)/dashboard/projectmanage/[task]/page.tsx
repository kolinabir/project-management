"use client";
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Divider,
  Typography,
  Modal,
  Form,
  Input,
  Button,
} from "antd";
import {
  FaClipboardList,
  FaSpinner,
  FaCheckCircle,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useProjectStore } from "@/lib/store";

const { Title, Text } = Typography;
const { TextArea } = Input;

const TaskPage = ({ params }) => {
  const project = useProjectStore((state) => state.getProjectById);
  const changeTaskStatus = useProjectStore((state) => state.changeTaskStatus);
  const addTaskToProject = useProjectStore((state) => state.addTaskToProject);
  const removeTaskFromProject = useProjectStore(
    (state) => state.removeTaskFromProject
  );
  const editTaskFromProject = useProjectStore(
    (state) => state.editTaskFromProject
  );

  const projectTask = project(params.task);
  const [tasks, setTasks] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    setTasks(projectTask.tasks);
  }, [params]);

  const handleEditModalOpen = (task) => {
    setEditTask(task);
    setEditModalVisible(true);
  };

  const handleEditModalClose = () => {
    setEditModalVisible(false);
  };

  const handleEditTask = (values) => {
    const updatedTask = { ...editTask, ...values };
    editTaskFromProject(project._id, editTask._id, updatedTask);
    setEditModalVisible(false);
  };

  const handleAddTask = () => {
    const newTask = {
      _id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      name: "New Task",
      description: "Description of the new task",
      status: "To Do",
    };
    addTaskToProject(project._id, newTask);
    setTasks([...tasks, newTask]);
  };

  const handleRemoveTask = (taskId) => {
    removeTaskFromProject(project._id, taskId);
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
    e.currentTarget.classList.add("opacity-50");
  };
  const handleDragOver = (e, status) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-blue-100");
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove("bg-blue-100");
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove("opacity-50");
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-blue-100");
    const draggedIndex = e.dataTransfer.getData("text/plain");
    const updatedTasks = [...tasks];
    const [draggedTask] = updatedTasks.splice(draggedIndex, 1);
    changeTaskStatus(projectTask._id, draggedTask._id, status);
    draggedTask.status = status;
    updatedTasks.push(draggedTask);
    setTasks(updatedTasks);
  };

  return (
    <>
      <Row gutter={[16, 16]} justify="center" className="mt-8">
        {/* To Do Column */}
        <Col xs={24} sm={8}>
          <Card
            className="drop-zone"
            title={
              <Title level={3}>
                <FaClipboardList className="text-gray-500 mr-2" />
                To Do
              </Title>
            }
            onDragOver={(e) => handleDragOver(e, "To Do")}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "To Do")}
          >
            {tasks
              .filter((task) => task.status === "To Do")
              .map((task, index) => (
                <div
                  key={task._id}
                  className="task-item"
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnd={handleDragEnd}
                >
                  <Title level={5}>{task.name}</Title>
                  <Text>{task.description}</Text>
                  <Divider />
                </div>
              ))}
          </Card>
        </Col>
        {/* In Progress Column */}
        <Col xs={24} sm={8}>
          <Card
            className="drop-zone"
            title={
              <div className="flex items-center">
                <FaSpinner className="text-yellow-500 mr-2" />
                <h3 className="text-lg font-semibold">In Progress</h3>
              </div>
            }
            onDragOver={(e) => handleDragOver(e, "In Progress")}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "In Progress")}
          >
            {tasks
              .filter((task) => task.status === "In Progress")
              .map((task, index) => (
                <div
                  key={task._id}
                  className="task-item"
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnd={handleDragEnd}
                >
                  <Title level={5}>{task.name}</Title>
                  <Text>{task.description}</Text>
                  <Divider />
                </div>
              ))}
          </Card>
        </Col>
        {/* Done Column */}
        <Col xs={24} sm={8}>
          <Card
            className="drop-zone"
            title={
              <div className="flex items-center ">
                <FaCheckCircle className="text-green-500 mr-2" />
                <h3 className="text-lg font-semibold">Done</h3>
              </div>
            }
            onDragOver={(e) => handleDragOver(e, "Done")}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "Done")}
          >
            {tasks
              .filter((task) => task.status === "Done")
              .map((task, index) => (
                <div
                  key={task._id}
                  className="task-item"
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnd={handleDragEnd}
                >
                  <Title level={5}>{task.name}</Title>
                  <Text>{task.description}</Text>
                  <Divider />
                </div>
              ))}
          </Card>
        </Col>
      </Row>
      {/* Edit Task Modal */}
      <Modal
        title="Edit Task"
        visible={editModalVisible}
        onCancel={handleEditModalClose}
        footer={null}
      >
        <Form
          onFinish={handleEditTask}
          initialValues={{
            name: editTask?.name,
            description: editTask?.description,
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Add Task Button */}
      <Button type="primary" onClick={handleAddTask} className="mb-2 mr-2">
        Add Task
      </Button>
      {/* Edit Task Button */}
      <Button
        onClick={() => handleEditModalOpen(editTask)}
        className="mb-2 mr-2"
      >
        Edit Task
      </Button>
      {/* Remove Task Button */}
      <Button
        type="danger"
        onClick={() => handleRemoveTask(editTask?._id)}
        className="mb-2"
      >
        Remove Task
      </Button>
    </>
  );
};

export default TaskPage;
