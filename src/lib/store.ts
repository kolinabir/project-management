import { create } from "zustand";
import { getProjects } from "./api";

export type TProject = {
  _id: string; // Assuming you have an ID field for projects
  name: string;
  description: string;
  tasks?: Array<TProjectTask>;
  recentActivities?: Array<string>;
  teamMembers?: Array<string>;
};

export type TProjectTask = {
  _id: string; // Assuming you have an ID field for tasks
  name: string;
  description: string;
  deadline: Date;
  assignedMembers?: Array<string>;
  status?: "To Do" | "In Progress" | "Done";
};

export const useProjectStore = create((set) => ({
  projects: [],
  addProject: (project: TProject) =>
    set((state: { projects: Array<TProject> }) => ({
      //add custom id which is unique
      projects: [...state.projects, { ...project, _id: Date.now().toString() }],
    })),
  getState: () => {
    return useProjectStore.getState();
  },
  getProjectById: (projectId: string) => {
    const projectStore = useProjectStore.getState() as {
      projects: Array<TProject>;
    };
    return projectStore.projects.find((project) => project._id === projectId);
  },
  addMemberToProject: (projectId: string, member: string) =>
    set((state: { projects: Array<TProject> }) => ({
      projects: state.projects.map((project) =>
        project._id === projectId
          ? {
              ...project,
              teamMembers: [...(project.teamMembers || []), member],
            }
          : project
      ),
    })),

  removeMemberFromProject: (projectId: string, member: string) =>
    set((state: { projects: Array<TProject> }) => ({
      projects: state.projects.map((project) =>
        project._id === projectId
          ? {
              ...project,
              teamMembers: (project.teamMembers || []).filter(
                (teamMember) => teamMember !== member
              ),
            }
          : project
      ),
    })),
  removeProject: (projectId: string) =>
    set((state: { projects: Array<TProject> }) => ({
      projects: state.projects.filter((project) => project._id !== projectId),
    })),
  updateProject: (projectId: string, updatedProject: TProject) =>
    set((state: { projects: Array<TProject> }) => ({
      projects: state.projects.map((project) =>
        project._id === projectId ? updatedProject : project
      ),
    })),
  addTaskToProject: (projectId: string, task: TProjectTask) =>
    set((state: { projects: Array<TProject> }) => ({
      projects: state.projects.map((project) =>
        project._id === projectId
          ? {
              ...project,
              tasks: [...(project.tasks || []), task],
            }
          : project
      ),
    })),
  removeTaskFromProject: (projectId: string, taskId: string) =>
    set((state: { projects: Array<TProject> }) => ({
      projects: state.projects.map((project) =>
        project._id === projectId
          ? {
              ...project,
              tasks: (project.tasks || []).filter(
                (task) => task._id !== taskId
              ),
            }
          : project
      ),
    })),

  editTaskFromProject: (
    projectId: string,
    taskId: string,
    updatedTask: TProjectTask
  ) =>
    set((state: { projects: Array<TProject> }) => ({
      projects: state.projects.map((project) =>
        project._id === projectId
          ? {
              ...project,
              tasks: (project.tasks || []).map((task) =>
                task._id === taskId ? updatedTask : task
              ),
            }
          : project
      ),
    })),
  changeTaskStatus: (
    projectId: string,
    taskId: string,
    newStatus: "To Do" | "In Progress" | "Done"
  ) =>
    set((state: { projects: Array<TProject> }) => ({
      projects: state.projects.map((project) =>
        project._id === projectId
          ? {
              ...project,
              tasks: (project.tasks || []).map((task) =>
                task._id === taskId ? { ...task, status: newStatus } : task
              ),
            }
          : project
      ),
    })),
  assignTaskToMember: (projectId: string, taskId: string, member: string) =>
    set((state: { projects: Array<TProject> }) => ({
      projects: state.projects.map((project) =>
        project._id === projectId
          ? {
              ...project,
              tasks: (project.tasks || []).map((task) =>
                task._id === taskId
                  ? {
                      ...task,
                      assignedMembers: [
                        ...(task.assignedMembers || []),
                        member,
                      ],
                    }
                  : task
              ),
            }
          : project
      ),
    })),
}));

// Initialize the store with projects fetched from the API
getProjects()
  .then((projects) => {
    // Ensure that projects is an array before setting it in the store
    if (Array.isArray(projects)) {
      useProjectStore.setState({ projects });
    } else {
      // Handle the case where projects is not an array
      console.error("Projects data is not in the expected format:", projects);
    }
  })
  .catch((error) => {
    console.error("Error fetching projects:", error);
  });
