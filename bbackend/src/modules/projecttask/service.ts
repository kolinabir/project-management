/* eslint-disable @typescript-eslint/no-unused-vars */
import { TProject, TProjectTask } from './interface'
import { Project, Task } from './model'

const createProjectIntoDB = async (payload: TProject) => {
  const project = await Project.create(payload)
  return project
}
const getAllProjectsFromDB = async () => {
  const projects = await Project.find().populate(
    'tasks',
    'name description status team recentActivities assignedMembers',
  )
  return projects
}

const getProjectFromDB = async (id: string) => {
  //tasks is an array of task ids
  const project = await Project.findById(id).populate(
    'tasks',
    'name description status team recentActivities assignedMembers',
  )
  return project
}

const editProjectInDB = async (id: string, payload: TProject) => {
  const project = await Project.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('tasks')
  return project
}

const addTaskToProjectInDB = async (
  projectId: string,
  payload: TProjectTask,
) => {
  const task = await Task.create(payload)
  const project = await Project.findByIdAndUpdate(
    projectId,
    { $push: { tasks: task._id } },
    { new: true },
  )
  return project
}

const editTaskInProjectInDB = async (taskId: string, payload: TProjectTask) => {
  const task = await Task.findByIdAndUpdate(taskId, payload, { new: true })
  return task
}

const deleteTaskFromProjectInDB = async (projectId: string, taskId: string) => {
  const project = await Project.findByIdAndUpdate(
    projectId,
    { $pull: { tasks: taskId } },
    { new: true },
  ).populate('tasks')
  const task = await Task.findByIdAndDelete(taskId)
  return project
}

const assignedMembersToTask = async (taskId: string, member: string) => {
  const task = await Task.findByIdAndUpdate(
    taskId,
    { $push: { assignedMembers: member } },
    { new: true },
  )
  return task
}

const deleteAssignedMembersFromTask = async (
  taskId: string,
  member: string,
) => {
  const task = await Task.findByIdAndUpdate(
    taskId,
    { $pull: { assignedMembers: member } },
    { new: true },
  )
  return task
}

export const projectService = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  getProjectFromDB,
  editProjectInDB,
  addTaskToProjectInDB,
  editTaskInProjectInDB,
  deleteTaskFromProjectInDB,
  assignedMembersToTask,
  deleteAssignedMembersFromTask,
}
