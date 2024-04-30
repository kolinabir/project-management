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
  const [projectM, setProjectM] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    setTasks(projectTask.tasks);
    setProjectM(projectTask);
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

  const handleAddTask = (name, description, deadline) => {
    const newTask = {
      _id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      name: name,
      deadline: deadline,
      description: description,
      status: "To Do",
    };
    addTaskToProject(project._id, newTask);
    setTasks([...tasks, newTask]);
  };

  const handleRemoveTask = (taskId) => {
    removeTaskFromProject(project._id, taskId);
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId);
    e.currentTarget.classList.add("opacity-50");
  };

  const handleDragOver = (e: string) => {
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
    const taskId = e.dataTransfer.getData("text/plain");
    const task = tasks.find((task) => task._id === taskId);
    if (task) {
      changeTaskStatus(projectTask._id, task._id, status);
      const updatedTasks = tasks.map((t) => {
        if (t._id === taskId) {
          return { ...t, status };
        }
        return t;
      });
      setTasks(updatedTasks);
    }
  };

  return (
    <>
      <div className="py-5 mt-5 ">
        <Form
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
          onFinish={({ name, description, deadline }) =>
            handleAddTask(name, description, deadline)
          }
          layout="inline"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input placeholder="Task Name" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input placeholder="Task Description" />
          </Form.Item>
          <Form.Item
            name="deadline"
            rules={[{ required: true, message: "Please enter a deadline" }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Task
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <Title level={2} style={{ marginBottom: "10px", textAlign: "center" }}>
          {projectM.name}
        </Title>
        <Text
          style={{
            textAlign: "center",
            width: "50%",
            color: "rgba(0, 0, 0, 0.65)",
          }}
        >
          {projectM.description}
        </Text>
      </div>
      <Divider />
      <Text
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          fontSize: "2.2rem",
          fontWeight: "bold",
        }}
      >
        All Tasks for this Project
      </Text>
      <Text
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          fontSize: "1.2rem",
        }}
      >
        Drag and drop tasks to change their status
      </Text>
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
                  style={{
                    backgroundColor: "dodgerblue",
                    padding: "10px",
                    color: "white",
                    borderRadius: "5px",
                    marginBottom: "10px",
                  }}
                  onDragStart={(e) => handleDragStart(e, task._id)}
                  onDragEnd={handleDragEnd}
                >
                  <div>
                    <Text>
                      {new Date(task.deadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Text>
                    <Title level={5}>{task.name}</Title>
                    <Text>{task.description}</Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <Button
                      onClick={() => handleEditModalOpen(task)}
                      icon={<FaEdit />}
                      size="small"
                      className="mr-2"
                    />
                    <Button
                      onClick={() => handleRemoveTask(task._id)}
                      icon={<FaTrash />}
                      size="small"
                    />
                  </div>
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
              <Title level={3}>
                <FaClipboardList className="text-gray-500 mr-2" />
                In Progress
              </Title>
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
                  style={{
                    backgroundColor: "yellowgreen",
                    padding: "10px",
                    color: "white",
                    borderRadius: "5px",
                    marginBottom: "10px",
                  }}
                  onDragStart={(e) => handleDragStart(e, task._id)}
                  onDragEnd={handleDragEnd}
                >
                  <div>
                    <Text>
                      {new Date(task.deadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Text>
                    <Title level={5}>{task.name}</Title>
                    <Text>{task.description}</Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <Button
                      onClick={() => handleEditModalOpen(task)}
                      icon={<FaEdit />}
                      size="small"
                      className="mr-2"
                    />
                    <Button
                      onClick={() => handleRemoveTask(task._id)}
                      icon={<FaTrash />}
                      size="small"
                    />
                  </div>
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
              <Title level={3}>
                <FaClipboardList className="text-gray-500 mr-2" />
                Done
              </Title>
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
                  onDragStart={(e) => handleDragStart(e, task._id)}
                  onDragEnd={handleDragEnd}
                  style={{
                    backgroundColor: "tomato",
                    padding: "10px",
                    color: "white",
                    borderRadius: "5px",
                    marginBottom: "10px",
                  }}
                >
                  <div className="">
                    <Text>
                      {new Date(task.deadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Text>
                    <Title level={5}>{task.name}</Title>
                    <Text>{task.description}</Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <Button
                      onClick={() => handleEditModalOpen(task)}
                      icon={<FaEdit />}
                      size="small"
                      className="mr-2"
                    />
                    <Button
                      onClick={() => handleRemoveTask(task._id)}
                      icon={<FaTrash />}
                      size="small"
                    />
                  </div>
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
      {/* Add Task Input */}
    </>
  );
};

export default TaskPage;
