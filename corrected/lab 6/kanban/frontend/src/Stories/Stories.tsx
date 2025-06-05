export type StoryPriority = 'low' | 'medium' | 'high';
export type StoryStatus = 'todo' | 'doing' | 'done';

export interface IStory {
  id: number;
  title: string;
  description: string;
  priority: StoryPriority;
  projectId: number;
  createdAt: Date;
  status: StoryStatus;
  ownerId: number;
}

export class Story implements IStory {
  id: number;
  title: string;
  description: string;
  priority: StoryPriority;
  projectId: number;
  createdAt: Date;
  status: StoryStatus;
  ownerId: number;

  constructor(
    title: string,
    description: string,
    priority: StoryPriority,
    projectId: number,
    status: StoryStatus,
    ownerId: number
  ) {
    this.id = Date.now(); 
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.projectId = projectId;
    this.createdAt = new Date();
    this.status = status;
    this.ownerId = ownerId;
  }
}