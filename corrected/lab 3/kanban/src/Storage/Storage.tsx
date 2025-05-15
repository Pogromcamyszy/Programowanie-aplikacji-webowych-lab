import type { IProject } from "../Projects/Project";
import type { IStory } from "../Stories/Story";

export class Storage {
  private projects: IProject[] = [];
  private stories: IStory[] = [];

  constructor() {
    const data = localStorage.getItem("projects");
    this.projects = data ? JSON.parse(data) : [];

    const storiesData = localStorage.getItem("stories");
    this.stories = storiesData ? JSON.parse(storiesData) : [];
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
    alert(id);
    const index = this.projects.findIndex(project => project.id == id);
    alert(index);
    if (index !== -1) {
    this.projects[index].name = name;
    this.projects[index].description = description;
    this.setProjects();
  }
  }
  
  getStories(projectId : number): IStory[] {

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
}
