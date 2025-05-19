export type TaskStatus = 'todo' | 'doing' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface ITask {
  id: number;
  name: string;
  description: string;
  priority: TaskPriority;
  storyId: number; 
  estimatedHours: number;
  status: TaskStatus;
  createdAt: string;
  startedAt?: string;     
  finishedAt?: string;    
  assignedUserId?: number; 
}

export class Task implements ITask {
  id: number;
  name: string;
  description: string;
  priority: TaskPriority;
  storyId: number;
  estimatedHours: number;
  status: TaskStatus;
  createdAt: string;
  startedAt?: string;
  finishedAt?: string;
  assignedUserId?: number;

  constructor(
    name: string,
    description: string,
    priority: TaskPriority,
    storyId: number,
    estimatedHours: number,
    status: TaskStatus,
    assignedUserId?: number,
  ) {
    this.id = Date.now(); 
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.storyId = storyId;
    this.estimatedHours = estimatedHours;
    this.status = status;
    this.createdAt = new Date().toISOString();
    this.assignedUserId = assignedUserId;
    if(assignedUserId) {
      this.status = 'doing';
      this.startedAt = new Date().toISOString();
    }
    if(status === 'done') {
      this.finishedAt = new Date().toISOString();
    }
  }
}