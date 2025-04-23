import { useState, useEffect } from "react";
import { Story } from "../Stories/Stories";
import { ProjectManager } from "../ProjectMeneger/ProjectMeneger";

interface TaskTableProps {
  projectId: number;
}

const TaskTable: React.FC<TaskTableProps> = ({ projectId }) => {
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    const projectManager = new ProjectManager();
    const fetchedStory = projectManager.getStoryById(projectId);  // Assuming getStoryById accepts projectId or storyId
    setStory(fetchedStory);
  }, [projectId]);

  return (
    <>
      <h1>Project ID: {projectId}</h1>
      {story ? (
        <div>
          <h2>Story Details</h2>
          <p><strong>Name:</strong> {story.name}</p>
          <p><strong>Description:</strong> {story.description}</p>
          <p><strong>Priority:</strong> {story.priority}</p>
          <p><strong>Status:</strong> {story.status}</p>
        </div>
      ) : (
        <p>Loading story details...</p>
      )}
    </>
  );
};

export default TaskTable;