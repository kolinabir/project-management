"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = exports.Task = void 0;
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    assignedMembers: { type: [String] },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do',
    },
});
exports.Task = (0, mongoose_1.model)('Task', taskSchema);
const projectSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    tasks: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Task' }],
    recentActivities: { type: [String] },
    teamMembers: { type: [String] },
});
exports.Project = (0, mongoose_1.model)('Project', projectSchema);
