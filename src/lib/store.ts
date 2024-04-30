import { create } from "zustand";

export type TProject = {
  name: string;
  description: string;
  tasks?: [TProjectTask];
  recentActivities?: [string];
  teamMembers?: [string];
};

export type TProjectTask = {
  name: string;
  description: string;
  deadline: Date;
  assignedMembers?: [string];
  status?: "To Do" | "In Progress" | "Done";
};

export const useProjectStore = create((set) => ({
  projects: [],
  setProjects: (projects: TProject) => set({ projects }),
  addProject: (project: TProject) =>
    set((state: any) => ({ projects: [...state.projects, project] })),
  removeProject: (projectId: string) =>
    set((state: any) => ({
      projects: state.projects.filter(
        (project: any) => project._id !== projectId
      ),
    })),
  updateProject: (projectId: any, updatedProject: any) =>
    set((state: any) => ({
      projects: state.projects.map((project: any) =>
        project._id === projectId ? updatedProject : project
      ),
    })),
  addTaskToProject: (projectId: any, task: TProjectTask) =>
    set((state: any) => ({
      projects: state.projects.map((project: any) =>
        project._id === projectId
          ? { ...project, tasks: [...project.tasks, task] }
          : project
      ),
    })),
  removeTaskFromProject: (projectId: any, taskId: any) =>
    set((state: any) => ({
      projects: state.projects.map((project: any) =>
        project._id === projectId
          ? {
              ...project,
              tasks: project.tasks.filter((task: any) => task._id !== taskId),
            }
          : project
      ),
    })),

  editTaskFromProject: (projectId: any, taskId: any, updatedTask: any) =>
    set((state: any) => ({
      projects: state.projects.map((project: any) =>
        project._id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task: any) =>
                task._id === taskId ? updatedTask : task
              ),
            }
          : project
      ),
    })),
}));
