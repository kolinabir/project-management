import { Types } from 'mongoose'

export type TProject = {
  name: string
  description: string
  tasks?: [Types.ObjectId]
  recentActivities?: [string]
  teamMembers?: [string]
}

export type TProjectTask = {
  name: string
  description: string
  deadline: Date
  assignedMembers?: [string]
  status: 'To Do' | 'In Progress' | 'Done'
}
