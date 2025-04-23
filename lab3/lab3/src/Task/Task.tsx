import { User, UserRole } from "../Users/Users";
import { Story } from "../Stories/Stories";

export enum TaskStatus {
  Todo = "todo",
  Doing = "doing",
  Done = "done",
}

export type TaskPriority = "low" | "medium" | "high";

export class Task {
  public id: number;
  public name: string;
  public description: string;
  public priority: TaskPriority;
  public story: Story;
  public estimatedTime: number;
  public status: TaskStatus;
  public createdAt: Date;
  public startDate: Date | null;
  public endDate: Date | null;
  public assignedUser: User | null;

  constructor(
    id: number,
    name: string,
    description: string,
    priority: TaskPriority,
    story: Story,
    estimatedTime: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.story = story;
    this.estimatedTime = estimatedTime;
    this.status = TaskStatus.Todo;
    this.createdAt = new Date();
    this.startDate = null;
    this.endDate = null;
    this.assignedUser = null;
  }
}