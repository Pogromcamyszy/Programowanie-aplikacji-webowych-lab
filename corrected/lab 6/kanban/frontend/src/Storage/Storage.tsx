import type { IProject } from "../Projects/Project";
import type { IStory } from "../Stories/Story";
import type { ITask } from "../Task/Tasks";

export class Storage {
  private projects: IProject[] = [];
  private stories: IStory[] = [];
  private tasks: ITask[] = [];

  constructor() {
    const data = localStorage.getItem("projects");
    this.projects = data ? JSON.parse(data) : [];

    const storiesData = localStorage.getItem("stories");
    this.stories = storiesData ? JSON.parse(storiesData) : [];

    const tasksData = localStorage.getItem("tasks");
    this.tasks = tasksData ? JSON.parse(tasksData) : [];
  }

  getProjects(): IProject[] {
    const data = localStorage.getItem("projects");
    return data ? JSON.parse(data) : [];
  }

  setProjects(): void {
    localStorage.setItem("projects", JSON.stringify(this.projects));
  }

  addProject(project: IProject): void {
    this.projects.push(project);
    this.setProjects();
  }

  removeProject(id: number): void {
    this.projects = this.projects.filter((project) => project.id !== id);
    this.setProjects();
  }

  editProject(id: number, name: string, description: string): void {
    alert("Edit Project");
    const index = this.projects.findIndex(project => project.id == id);
    if (index !== -1) {
      this.projects[index].name = name;
      this.projects[index].description = description;
      this.setProjects();
    }
  }

  getStories(projectId: number): IStory[] {

    const data = localStorage.getItem("stories");
    const stories = data ? JSON.parse(data) : [];
    return stories.filter((story) => story.projectId === projectId);
  }

  setStories(): void {
    localStorage.setItem("stories", JSON.stringify(this.stories));
  }

  addStory(story: IStory): void {
    this.stories.push(story);
    this.setStories();
  }

  removeStory(id: number): void {
    this.stories = this.stories.filter((story) => story.id !== id);
    this.setStories();
  }

  editStory(id: number, title: string, description: string, priority: string, status: string): void {
    const index = this.stories.findIndex(story => story.id == id);
    if (index !== -1) {
      this.stories[index].title = title;
      this.stories[index].description = description;
      this.stories[index].priority = priority;
      this.stories[index].status = status;
      this.setStories();
    }
  }



  getTasks(storyId: number): ITask[] {
    const data = localStorage.getItem("tasks");
    const tasks = data ? JSON.parse(data) : [];
    return tasks.filter((task) => task.storyId === storyId);
  }
  setTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
  addTask(task: ITask): void {
    this.tasks.push(task);
    this.setTasks();
  }
  removeTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.setTasks();
  }

  editTask(
    id: number,
    name: string,
    description: string,
    estimatedHours: number,
    priority: string,
    status: string,
    assignedUserId?: number,
  ): void {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return;

    const task = this.tasks[index];

    task.name = name;
    task.description = description;
    task.priority = priority;
    task.estimatedHours = estimatedHours;

    if (!assignedUserId) {
      task.assignedUserId = undefined;
      task.status = "todo";
      task.startedAt = undefined;
      task.finishedAt = undefined;
    } else {
      task.assignedUserId = assignedUserId;

      if (status === "done") {
        task.status = "done";
        task.startedAt = task.startedAt || new Date().toISOString();
        task.finishedAt = new Date().toISOString();
      } else {
        task.status = "doing";
        task.startedAt = task.startedAt || new Date().toISOString();
        task.finishedAt = undefined;
      }
    }

    this.setTasks();
  }
}
