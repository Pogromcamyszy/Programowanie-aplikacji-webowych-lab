import React, { useState, useEffect } from 'react';
import { Story, Priority, Status } from '../Stories/Stories.tsx'; 
import { User } from "../Users/Users.tsx";   
import { ProjectManager } from '../ProjectMeneger/ProjectMeneger.tsx';

interface ProjectDetailProps {
  id: number;
}

const projectManager = new ProjectManager();
const user = new User(2, 'John', 'Doe'); 

const ProjectDetail: React.FC<ProjectDetailProps> = ({ id }) => {  
  const [stories, setStories] = useState<Story[]>([]);
  const [storyName, setStoryName] = useState<string>('');
  const [storyDescription, setStoryDescription] = useState<string>('');
  const [storyPriority, setStoryPriority] = useState<Priority>(Priority.Low);
  const [storyStatus, setStoryStatus] = useState<Status>(Status.Todo);
  const [storyOwnerId, setStoryOwnerId] = useState<number>(user.id);
  const [editedId, setEditedId] = useState<number | null>(null);
  const [isEdited, setIsEdited] = useState<boolean>(false);

  useEffect(() => {
    setStories(projectManager.getStory().filter(story => story.ownerId === user.id)); // Only get stories that belong to the user
  }, []);  // Run once when the component mounts

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

    // Update the state to reflect the added story
    setStories(prevStories => [...prevStories, newStory]);
  };

  const deleteStory = (storyId: number) => {
    projectManager.deleteStory(storyId);
    setStories(prevStories => prevStories.filter(story => story.id !== storyId));
  };

  const editStory = (storyId: number) => {
    const story = stories.find(story => story.id === storyId);
    if (story) {
      setEditedId(storyId);
      setStoryName(story.name);
      setStoryDescription(story.description);
      setStoryPriority(story.priority);
      setStoryStatus(story.status);
      setIsEdited(true);
    }  
  }

  const sendEdit = () => {
    alert("dsadsa");
    projectManager.editStory(editedId, storyName, storyDescription, storyPriority, storyStatus);
    setStories(projectManager.getStory().filter(story => story.ownerId === user.id));
    setEditedId(0);
    setStoryName("");
    setStoryDescription("");
    setIsEdited(false);
  };

  // Function to get stories by status and ownerId
  const getStoriesByStatusAndOwner = (status: Status) => {
    return stories.filter(story => story.status === status && story.ownerId === user.id);
  };

  return (
    <div>
      <h2>Project ID: {id}</h2>

      {/* Story Form */}
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
      {!isEdited &&(
        <button onClick={addStory}>Add Story</button>
      )}

      {isEdited && (
        <>
          <button onClick={() => sendEdit()}>Edit</button> 
          <button onClick={() => setIsEdited(false)}>Cancel</button>
        </>
      )}

      {/* Display Stories by Status */}
      <div className="story-group">
        <h3>Todo</h3>
        <div className="story-list todo">
          {getStoriesByStatusAndOwner(Status.Todo).map((story) => (
            <div key={story.id} className="story-item">
              {story.id} <strong>{story.name}</strong>: {story.description} (Priority: {story.priority}) (Owner: {story.ownerId}) (Status: {story.status})
              {!isEdited && (
              <>
                <button onClick={() => deleteStory(story.id)}>Delete</button>
                <button onClick={() => editStory(story.id)}>Edit</button>
              </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="story-group">
        <h3>In Progress</h3>
        <div className="story-list in-progress">
          {getStoriesByStatusAndOwner(Status.InProgress).map((story) => (
            <div key={story.id} className="story-item">
              {story.id} <strong>{story.name}</strong>: {story.description} (Priority: {story.priority}) (Owner: {story.ownerId}) (Status: {story.status})
              {!isEdited && (
              <>
                <button onClick={() => deleteStory(story.id)}>Delete</button>
                <button onClick={() => editStory(story.id)}>Edit</button>
              </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="story-group">
        <h3>Done</h3>
        <div className="story-list done">
          {getStoriesByStatusAndOwner(Status.Done).map((story) => (
            <div key={story.id} className="story-item">
              {story.id} <strong>{story.name}</strong>: {story.description} (Priority: {story.priority}) (Owner: {story.ownerId}) (Status: {story.status})
              {!isEdited && (
              <>
                <button onClick={() => deleteStory(story.id)}>Delete</button>
                <button onClick={() => editStory(story.id)}>Edit</button>
              </>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProjectDetail;
