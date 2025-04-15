export enum Priority {
    Low = 'low',
    Medium = 'medium',
    High = 'high',
  }
  
export  enum Status {
    Todo = 'todo',
    InProgress = 'inProgress',
    Done = 'done',
  }
  
export  class Story {
    public id: number;
    public id_project: number;
    public name: string;
    public description: string;
    public priority: Priority;
    public status: Status;
    public dateCreated: Date;
    public ownerId: number;
  
    constructor(
      id_project: number,
      name: string,
      description: string,
      priority: Priority,
      ownerId: number,
      status: Status = Status.Todo
    ) {
      this.id = Date.now();
      this.id_project = id_project;
      this.name = name;
      this.description = description;
      this.priority = priority;
      this.status = status;
      this.dateCreated = new Date();
      this.ownerId = ownerId;
    }
  
    updateStatus(newStatus: Status) {
      this.status = newStatus;
    }
  }

  