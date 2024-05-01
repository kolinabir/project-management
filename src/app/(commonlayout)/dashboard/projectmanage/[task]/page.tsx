"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/*tslint:disable*/
// @ts-nocheck
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
  Select,
} from "antd";
import {
  FaClipboardList,
  FaSpinner,
  FaCheckCircle,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import SearchBar from "@/components/Search/SearchBar";
import { useProjectStore } from "@/lib/store";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const TaskPage = ({ params }) => {
  const project = useProjectStore((state) => state.getProjectById);
  const changeTaskStatus = useProjectStore((state) => state.changeTaskStatus);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const addTaskToProject = useProjectStore((state) => state.addTaskToProject);
  const removeTaskFromProject = useProjectStore(
    (state) => state.removeTaskFromProject
  );
  const editTaskFromProject = useProjectStore(
    (state) => state.editTaskFromProject
  );
  const assignTaskToMember = useProjectStore(
    (state) => state.assignTaskToMember
  );
  const removeMemberFromTask = useProjectStore(
    (state) => state.removeMemberFromTask
  );

  const handleSearch = (searchTerm, filterBy) => {
    let filtered = tasks;

    if (searchTerm) {
      if (filterBy === "status") {
        filtered = filtered.filter((task) =>
          task.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else if (filterBy === "dueDate") {
        filtered = filtered.filter((task) => {
          const dueDate = new Date(task.deadline);
          if (isNaN(dueDate.getTime())) {
            // Skip filtering for tasks with invalid deadline
            return true;
          }
          return dueDate
            .toLocaleDateString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        });
      } else if (filterBy === "assignee") {
        filtered = filtered.filter((task) =>
          (task.assignedMembers || []).some((member) =>
            member.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
    }

    setFilteredTasks(filtered);
  };
  const projectTask = project(params.task);
  const [tasks, setTasks] = useState([]);
  const [projectM, setProjectM] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [selectedMember, setSelectedMember] = useState("");
  useEffect(() => {
    setFilteredTasks(projectTask?.tasks);
    setTasks(projectTask?.tasks);
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
    const updatedTask = { ...(editTask || {}), ...values };
    if (editTask) {
      editTaskFromProject(project._id, editTask._id, updatedTask);
    }
    const updatedTasks = filteredTasks.map((task) =>
      task._id === editTask._id ? updatedTask : task
    );
    setFilteredTasks(updatedTasks);
    setEditModalVisible(false);
    //empty the edit task
    values.description = "";
    values.name = "";
    setEditTask(null);
  };

  const handleAddTask = (name, description, deadline) => {
    const newTask = {
      _id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      name: name,
      deadline: deadline,
      description: description,
      status: "To Do",
      assignedMembers: [], // Initialize an empty array for assigned members
    };
    addTaskToProject(project._id, newTask);
    setFilteredTasks([...tasks, newTask]);
  };

  const handleRemoveTask = (taskId) => {
    removeTaskFromProject(project._id, taskId);
    setFilteredTasks(filteredTasks.filter((task) => task._id !== taskId));
  };

  const handleAssignMember = (taskId) => {
    const task = filteredTasks.find((task) => task._id === taskId);

    if (task && !task.assignedMembers.includes(selectedMember)) {
      assignTaskToMember(project._id, taskId, selectedMember);

      const updatedTasks = filteredTasks.map((t) => {
        if (t._id === taskId) {
          const newAssignedMembers = [
            ...(t.assignedMembers || []),
            selectedMember,
          ];
          return { ...t, assignedMembers: newAssignedMembers };
        }
        return t;
      });

      setFilteredTasks(updatedTasks);
    } else {
      console.log("Member already assigned to this task.");
    }
  };

  const handleRemoveMember = (taskId, member) => {
    const updatedTasks = filteredTasks.map((task) =>
      task._id === taskId
        ? {
            ...task,
            assignedMembers: (task.assignedMembers || []).filter(
              (assignedMember) => assignedMember !== member
            ),
          }
        : task
    );
    setFilteredTasks(updatedTasks);
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId);
    e.currentTarget.classList.add("opacity-50");
  };

  const handleDragOver = (e) => {
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
    const task = filteredTasks.find((task) => task._id === taskId);
    if (task) {
      changeTaskStatus(projectTask._id, task._id, status);
      const updatedTasks = filteredTasks.map((t) => {
        if (t._id === taskId) {
          return { ...t, status };
        }
        return t;
      });
      setFilteredTasks(updatedTasks);
    }
  };

  return (
    <>
      {" "}
      <SearchBar
        tasks={filteredTasks}
        projectM={projectM}
        onSearch={handleSearch}
      />
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
          {projectM?.name || <FaSpinner className="animate-spin" />}
        </Title>
        <Title level={4} style={{ marginBottom: "10px", textAlign: "center" }}>
          {projectM?.description || <FaSpinner className="animate-spin" />}
        </Title>
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
            {filteredTasks
              ?.filter((task) => task.status === "To Do")
              .map((task, index) => (
                <div
                  key={task._id}
                  className="task-item"
                  draggable
                  style={{
                    backgroundColor: "tomato",
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
                      <Text>Deadline: </Text>
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
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        marginTop: "5px",
                      }}
                    >
                      <strong>Assigned Members: </strong>
                      {task.assignedMembers &&
                      task.assignedMembers.length > 0 ? (
                        task.assignedMembers.map((member) => (
                          <div
                            key={member}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <span>{member}</span>
                            <Button
                              onClick={() =>
                                handleRemoveMember(task._id, member)
                              }
                              icon={<FaTrash />}
                              size="small"
                              style={{ marginLeft: "5px" }}
                            />
                          </div>
                        ))
                      ) : (
                        <span>No assigned members</span>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "5px",
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
                  </div>
                  <Divider />
                  <Select
                    defaultValue=""
                    onChange={(value) => setSelectedMember(value)}
                    style={{ width: 200 }}
                  >
                    {projectM.teamMembers.map((member) => (
                      <Option key={member} value={member}>
                        {member}
                      </Option>
                    ))}
                  </Select>
                  <Button
                    onClick={() => handleAssignMember(task._id)}
                    type="primary"
                  >
                    Assign Member
                  </Button>
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
            {filteredTasks
              ?.filter((task) => task.status === "In Progress")
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
                      <Text>DeadLine: </Text>
                      {new Date(task?.deadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Text>
                    <Title level={5}>{task?.name}</Title>
                    <Text>{task?.description}</Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        marginTop: "5px",
                      }}
                    >
                      <strong>Assigned Members: </strong>
                      {task?.assignedMembers &&
                      task?.assignedMembers.length > 0 ? (
                        task?.assignedMembers.map((member) => (
                          <div
                            key={member}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <span>{member}</span>
                            <Button
                              onClick={() =>
                                handleRemoveMember(task?._id, member)
                              }
                              icon={<FaTrash />}
                              size="small"
                              style={{ marginLeft: "5px" }}
                            />
                          </div>
                        ))
                      ) : (
                        <span>No assigned members</span>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "5px",
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
                  </div>
                  <Divider />
                  <Select
                    defaultValue=""
                    onChange={(value) => setSelectedMember(value)}
                    style={{ width: 200 }}
                  >
                    {projectM.teamMembers.map((member) => (
                      <Option key={member} value={member}>
                        {member}
                      </Option>
                    ))}
                  </Select>
                  <Button
                    onClick={() => handleAssignMember(task._id)}
                    type="primary"
                  >
                    Assign Member
                  </Button>
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
            {filteredTasks
              ?.filter((task) => task.status === "Done")
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
                      <Text>DeadLine: </Text>
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
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        marginTop: "5px",
                      }}
                    >
                      <strong>Assigned Members: </strong>
                      {task.assignedMembers &&
                      task.assignedMembers.length > 0 ? (
                        task.assignedMembers.map((member) => (
                          <div
                            key={member}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <span>{member}</span>
                            <Button
                              onClick={() =>
                                handleRemoveMember(task._id, member)
                              }
                              icon={<FaTrash />}
                              size="small"
                              style={{ marginLeft: "5px" }}
                            />
                          </div>
                        ))
                      ) : (
                        <span>No assigned members</span>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "5px",
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
                  </div>
                  <Divider />
                  <Select
                    defaultValue=""
                    onChange={(value) => setSelectedMember(value)}
                    style={{ width: 200 }}
                  >
                    {projectM.teamMembers.map((member) => (
                      <Option key={member} value={member}>
                        {member}
                      </Option>
                    ))}
                  </Select>
                  <Button
                    onClick={() => handleAssignMember(task._id)}
                    type="primary"
                  >
                    Assign Member
                  </Button>
                </div>
              ))}
          </Card>
        </Col>
      </Row>
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
    </>
  );
};

export default TaskPage;
