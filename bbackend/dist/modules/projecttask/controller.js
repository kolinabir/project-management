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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendRespone_1 = __importDefault(require("../../utils/sendRespone"));
const http_status_1 = __importDefault(require("http-status"));
const service_1 = require("./service");
const createProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield service_1.projectService.createProjectIntoDB(req.body);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Project created successfully',
        data: project,
    });
}));
const addTeamMembers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield service_1.projectService.addTeamMembersToProject(req.params.id, req.body.teamMembers);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Members added successfully',
        data: project,
    });
}));
const getAllProjects = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield service_1.projectService.getAllProjectsFromDB();
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Project fetched successfully',
        data: projects,
    });
}));
const getProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield service_1.projectService.getProjectFromDB(req.params.id);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Project fetched successfully',
        data: project,
    });
}));
const editProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield service_1.projectService.editProjectInDB(req.params.id, req.body);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Project updated successfully',
        data: project,
    });
}));
const addTaskToProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield service_1.projectService.addTaskToProjectInDB(req.params.id, req.body);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Task added successfully',
        data: project,
    });
}));
const editTaskInProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield service_1.projectService.editTaskInProjectInDB(req.params.id, req.body);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Task updated successfully',
        data: task,
    });
}));
const deleteTaskFromProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield service_1.projectService.deleteTaskFromProjectInDB(req.params.id, req.body.taskId);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Task deleted successfully',
        data: project,
    });
}));
const assignedMembersToTask = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield service_1.projectService.assignedMembersToTask(req.params.id, req.body.member);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Members assigned successfully',
        data: task,
    });
}));
const deleteAssignedMembersFromTask = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield service_1.projectService.deleteAssignedMembersFromTask(req.params.id, req.body.member);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Members deleted successfully',
        data: task,
    });
}));
const addRecentActivity = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield service_1.projectService.addRecentActivityInDB(req.params.id, req.body);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Recent activity added successfully',
        data: project,
    });
}));
const removeRecentActivity = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield service_1.projectService.removeRecentActivityFromDB(req.params.id, req.body);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Recent activity removed successfully',
        data: project,
    });
}));
const searchTask = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield service_1.projectService.searchTasks(req.query);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Tasks fetched successfully',
        data: tasks,
    });
}));
exports.projectController = {
    createProject,
    getProject,
    getAllProjects,
    editProject,
    addTaskToProject,
    editTaskInProject,
    deleteTaskFromProject,
    assignedMembersToTask,
    deleteAssignedMembersFromTask,
    addRecentActivity,
    addTeamMembers,
    removeRecentActivity,
    searchTask,
};
