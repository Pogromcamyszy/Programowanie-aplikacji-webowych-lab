import React, { useState, useEffect } from 'react';
import { Story, Priority, Status } from '../Stories/Stories.tsx'; 
import { User, users, UserRole } from "../Users/Users.tsx";   
import { ProjectManager } from '../ProjectMeneger/ProjectMeneger.tsx';
import TaskTable from '../Task/TaskTable.tsx';  

interface ProjectDetailProps {
  id: number;
}

const projectManager = new ProjectManager();

// Logged-in user by ID (example: Admin with ID = 1)
const user = users.find(u => u.id === 1)!;

const ProjectDetail: React.FC<ProjectDetailProps> = ({ id }) => {  
  const [stories, setStories] = useState<Story[]>([]);
  const [storyName, setStoryName] = useState<string>('');
  const [storyDescription, setStoryDescription] = useState<string>('');
  const [storyPriority, setStoryPriority] = useState<Priority>(Priority.Low);
  const [storyStatus, setStoryStatus] = useState<Status>(Status.Todo);
  const [editedId, setEditedId] = useState<number | null>(null);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    // Fetch all stories instead of filtering by owner
    const allStories = projectManager.getStory();
    setStories(allStories);
  }, []);

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

  const resetForm = () => {
    setStoryName("");
    setStoryDescription("");
    setStoryPriority(Priority.Low);
    setStoryStatus(Status.Todo);
    setEditedId(null);
    setIsEdited(false);
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
    setStories(prevStories => [...prevStories, newStory]);
    resetForm();
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
  };

  const sendEdit = () => {
    if (editedId !== null) {
      projectManager.editStory(editedId, storyName, storyDescription, storyPriority, storyStatus);
      const updatedStories = projectManager.getStory();
      setStories(updatedStories);
      resetForm();
    }
  };

  const getStoriesByStatus = (status: Status) => {
    return stories.filter(story => story.status === status && story.projectId === id);  // Filter by projectId
  };

  return (
    <>
      {selectedStory !== null ? (
        <div>
          <button onClick={() => setSelectedStory(null)}>Back</button>
          <TaskTable projectId={selectedStory.id} />
        </div>
      ) : (
        <div>
          <h2>Project ID: {id}</h2>
          <h3>Logged in as: {user.firstName} {user.lastName} ({user.role})</h3>

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

          {!isEdited ? (
            <button onClick={addStory}>Add Story</button>
          ) : (
            <>
              <button onClick={sendEdit}>Save Edit</button> 
              <button onClick={resetForm}>Cancel</button>
            </>
          )}

          {/* Story Lists */}
          {[Status.Todo, Status.InProgress, Status.Done].map(status => (
            <div key={status} className="story-group">
              <h3>{status}</h3>
              <div className={`story-list ${status.toLowerCase()}`}>
                {getStoriesByStatus(status).map((story) => (
                  <div key={story.id} className="story-item">
                    <strong>{story.name}</strong> - {story.description} 
                    <br />
                    Priority: {story.priority} | Owner: {story.ownerId} | Status: {story.status}
                    {!isEdited && (
                      <>
                        <br />
                        <button onClick={() => setSelectedStory(story)}>View</button>
                        <button onClick={() => deleteStory(story.id)}>Delete</button>
                        <button onClick={() => editStory(story.id)}>Edit</button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProjectDetail;
