import { Schema, model } from 'mongoose'
import { TProject, TProjectTask } from './interface'

const taskSchema = new Schema<TProjectTask>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  assignedMembers: { type: [String] },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do',
  },
})

export const Task = model<TProjectTask>('Task', taskSchema)

const projectSchema = new Schema<TProject>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  recentActivities: { type: [String] },
  teamMembers: { type: [String] },
})

export const Project = model<TProject>('Project', projectSchema)
