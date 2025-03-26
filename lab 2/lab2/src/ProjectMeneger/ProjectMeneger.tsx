import { Project, IProject } from './Project';
import {Stories} from './Stories';

export class ProjectManager {
  projects: Project[];
  stories: Stories[];
  

  constructor() {
    this.projects = JSON.parse(localStorage.getItem('projects') || '[]');
    this.stories = JSON.parse(localStorage.getItem('stories') || '[]');
  }

  addProject(project: IProject) {
    this.projects.push(project);
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  editProject(id:number , name: string, description: string) {
    const index = this.projects.findIndex((p) => p.id === id);
    console.log(index);
    const project:IProject = this.projects[index];
    project.name = name;
    project.description = description;
    this.projects[index] = project;
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  deleteProject(id: number) {
    const index = this.projects.findIndex((p) => p.id === id);
    this.projects.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(this.projects));
  };

  getProject(id: number) {
    const project = this.projects.find((p) => p.id === id);
    return project;
  }

  getProjects() {
    return this.projects;
  }
  
  addStory(story: Stories) {
    alert(story);
     this.stories.push(story);
     localStorage.setItem('stories', JSON.stringify(this.stories));
  }

  getStory(){
    return this.stories
  }
}