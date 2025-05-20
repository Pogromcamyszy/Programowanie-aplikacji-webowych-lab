import type { IProject } from "../Projects/Project";

export class Storage {
  private projects: IProject[] = [];

  constructor() {
    const data = localStorage.getItem("projects");
    this.projects = data ? JSON.parse(data) : [];
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
    const index = this.projects.findIndex(project => project.id == id);
    if (index !== -1) {
    this.projects[index].name = name;
    this.projects[index].description = description;
    this.setProjects();
  }
  }
}
