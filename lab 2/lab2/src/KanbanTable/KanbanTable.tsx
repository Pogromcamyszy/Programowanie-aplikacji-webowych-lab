import React, { useState } from 'react';
import { Story, Priority, Status } from '../Stories/Stories.tsx'; 
import { User } from "../Users/Users.tsx";   
import { ProjectManager } from '../ProjectMeneger/ProjectMeneger.tsx';

interface ProjectDetailProps {
  id: number;
}

const projectManager = new ProjectManager();

const user = new User(1, 'John', 'Doe'); 

const ProjectDetail: React.FC<ProjectDetailProps> = ({ id }) => {  
  
  const [stories, setStories] = useState<Story[]>([]);
  const [storyName, setStoryName] = useState<string>('');
  const [storyDescription, setStoryDescription] = useState<string>('');
  const [storyPriority, setStoryPriority] = useState<Priority>(Priority.Low);
  const [storyStatus, setStoryStatus] = useState<Status>(Status.Todo);
  const [storyOwnerId, setStoryOwnerId] = useState<number>(user.id);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [editedId, setEditedId] = useState<number>(0);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoryName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoryDescription(e.target.value);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStoryPriority(e.target.value as Priority);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStoryStatus(e.target.value as Status);
  };

  const addStory = () => {
    const newStory = new Story(
    id, 
    storyName,
    storyDescription,
    storyPriority,
    user.id, 
    storyStatus,
    );
    projectManager.addStory(newStory);
    setStories([...stories, newStory]);
  };


  return (
    <div>
      <h2>Project ID: {id}</h2>

      {/* Story Form */}
      {/* Project ID is visible but read-only */}
      <div>
        <label>Project ID:</label>
        <input type="text" value={id} readOnly />
      </div>

      <input
        type="text"
        placeholder="Story Name"
        value={storyName}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder="Story Description"
        value={storyDescription}
        onChange={handleDescriptionChange}
      />
      <select value={storyPriority} onChange={handlePriorityChange}>
        <option value={Priority.Low}>Low</option>
        <option value={Priority.Medium}>Medium</option>
        <option value={Priority.High}>High</option>
      </select>
      <select value={storyStatus} onChange={handleStatusChange}>
        <option value={Status.Todo}>Todo</option>
        <option value={Status.InProgress}>In Progress</option>
        <option value={Status.Done}>Done</option>
      </select>
      <button onClick={isEdited ? updateStory : addStory}>
        {isEdited ? 'Update Story' : 'Add Story'}
      </button>

      <ul>
      {stories
        .filter((story) => story.id_project === id)
        .map((story) => (
          <li key={story.id}>
            {story.id} <strong>{story.name}</strong>: {story.description} (Priority: {story.priority})
          </li>
        ))}
    </ul>

    </div>
  );
};

export default ProjectDetail;
