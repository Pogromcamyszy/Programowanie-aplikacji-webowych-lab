export type StoryPriority = 'low' | 'medium' | 'high';
export type StoryStatus = 'todo' | 'doing' | 'done';

export interface IStory {
  _id: string;
  title: string;
  description: string;
  priority: StoryPriority;
  status: StoryStatus;
  ownerId: string;
  projectId: string
}
