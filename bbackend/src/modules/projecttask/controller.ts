import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendRespone'
import { Project } from './model'
import httpStatus from 'http-status'
import { projectService } from './service'

const createProject = catchAsync(async (req, res) => {
  const project = await projectService.createProjectIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project created successfully',
    data: project,
  })
})

const getAllProjects = catchAsync(async (req, res) => {
  const projects = await projectService.getAllProjectsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project fetched successfully',
    data: projects,
  })
})

const getProject = catchAsync(async (req, res) => {
  const project = await projectService.getProjectFromDB(req.params.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project fetched successfully',
    data: project,
  })
})

const editProject = catchAsync(async (req, res) => {
  const project = await projectService.editProjectInDB(req.params.id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project updated successfully',
    data: project,
  })
})

const addTaskToProject = catchAsync(async (req, res) => {
  const project = await projectService.addTaskToProjectInDB(
    req.params.id,
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task added successfully',
    data: project,
  })
})
const editTaskInProject = catchAsync(async (req, res) => {
  const task = await projectService.editTaskInProjectInDB(
    req.params.id,
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task updated successfully',
    data: task,
  })
})

const deleteTaskFromProject = catchAsync(async (req, res) => {
  const project = await projectService.deleteTaskFromProjectInDB(
    req.params.id,
    req.body.taskId,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task deleted successfully',
    data: project,
  })
})

const assignedMembersToTask = catchAsync(async (req, res) => {
  const task = await projectService.assignedMembersToTask(
    req.params.id,
    req.body.member,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Members assigned successfully',
    data: task,
  })
})

const deleteAssignedMembersFromTask = catchAsync(async (req, res) => {
  const task = await projectService.deleteAssignedMembersFromTask(
    req.params.id,
    req.body.member,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Members deleted successfully',
    data: task,
  })
})

export const projectController = {
  createProject,
  getProject,
  getAllProjects,
  editProject,
  addTaskToProject,
  editTaskInProject,
  deleteTaskFromProject,
  assignedMembersToTask,
  deleteAssignedMembersFromTask,
}
