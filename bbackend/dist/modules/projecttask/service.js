"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectService = void 0;
const model_1 = require("./model");
const createProjectIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield model_1.Project.create(payload);
    return project;
});
const getAllProjectsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield model_1.Project.find().populate('tasks', 'name description status team recentActivities assignedMembers deadline');
    return projects;
});
const addTeamMembersToProject = (projectId, member) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield model_1.Project.findByIdAndUpdate(projectId, { $push: { teamMembers: member } }, { new: true });
    return project;
});
const getProjectFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //tasks is an array of task ids
    const project = yield model_1.Project.findById(id).populate('tasks', 'name description status team recentActivities assignedMembers deadline');
    return project;
});
const editProjectInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield model_1.Project.findByIdAndUpdate(id, payload, {
        new: true,
    }).populate('tasks');
    return project;
});
const addTaskToProjectInDB = (projectId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield model_1.Task.create(payload);
    const project = yield model_1.Project.findByIdAndUpdate(projectId, { $push: { tasks: task._id } }, { new: true });
    return project;
});
const editTaskInProjectInDB = (taskId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield model_1.Task.findByIdAndUpdate(taskId, payload, { new: true });
    return task;
});
const deleteTaskFromProjectInDB = (projectId, taskId) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield model_1.Project.findByIdAndUpdate(projectId, { $pull: { tasks: taskId } }, { new: true }).populate('tasks');
    const task = yield model_1.Task.findByIdAndDelete(taskId);
    return project;
});
const assignedMembersToTask = (taskId, member) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield model_1.Task.findByIdAndUpdate(taskId, { $push: { assignedMembers: member } }, { new: true });
    return task;
});
const deleteAssignedMembersFromTask = (taskId, member) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield model_1.Task.findByIdAndUpdate(taskId, { $pull: { assignedMembers: member } }, { new: true });
    return task;
});
const addRecentActivityInDB = (projectId, activity) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield model_1.Project.findByIdAndUpdate(projectId, { $push: { recentActivities: activity } }, { new: true });
    return project;
});
const removeRecentActivityFromDB = (projectId, activity) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield model_1.Project.findByIdAndUpdate(projectId, { $pull: { recentActivities: activity } }, { new: true });
    return project;
});
//query to  filter tasks by status, due date, or assignee.
const searchTasks = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield model_1.Task.find(query).populate('assignedMembers', 'name email');
    return tasks;
});
exports.projectService = {
    createProjectIntoDB,
    addTeamMembersToProject,
    getAllProjectsFromDB,
    getProjectFromDB,
    editProjectInDB,
    addTaskToProjectInDB,
    editTaskInProjectInDB,
    deleteTaskFromProjectInDB,
    assignedMembersToTask,
    deleteAssignedMembersFromTask,
    addRecentActivityInDB,
    removeRecentActivityFromDB,
    searchTasks,
};
