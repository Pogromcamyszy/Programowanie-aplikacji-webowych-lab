import { useState, useEffect } from 'react';
import { IProject, Project } from './Project/Project.tsx';
import { ProjectManager } from './ProjectMeneger/ProjectMeneger.tsx';
import KanbanTable from './KanbanTable/KanbanTable'; // Import the KanbanTable component

function App() {
  const projectManager = new ProjectManager();

  const [projects, setProjects] = useState<IProject[]>([]);
  const [projectName, setProjectName] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [editedId, setEditedId] = useState<number | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null); // Track the selected project

  // Load projects once when the component mounts
  useEffect(() => {
    setProjects(projectManager.getProjects());
  }, []); 

  // Input Handlers
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectDescription(e.target.value);
  };

  // Add a new project
  const addProject = () => {
    const project = new Project(projectName, projectDescription);
    projectManager.addProject(project);
    setProjects(projectManager.getProjects()); // Fix: Update projects after adding
    resetForm();
  };

  // Edit an existing project
  const goToEdit = (id: number) => {
    const project = projectManager.getProject(id);
    if (project) {
      setProjectName(project.name);
      setProjectDescription(project.description);
      setIsEdited(true);
      setEditedId(id);
    }
  };

  // Update project details
  const updateProject = () => {
    if (editedId !== null) {
      projectManager.editProject(editedId, projectName, projectDescription);
      setProjects(projectManager.getProjects()); // Fix: Ensure updated projects are displayed
      resetForm();
    }
  };

  // Delete a project
  const deleteProject = (id: number) => {
    projectManager.deleteProject(id);
    setProjects(projectManager.getProjects());
  };

  // Cancel edit mode
  const cancelEdit = () => {
    resetForm();
  };

  // View Kanban for a project
  const viewKanban = (id: number) => {
    setSelectedProjectId(id);
  };

  // Go back to project list
  const goBackToProjects = () => {
    setSelectedProjectId(null);
  };

  // Reset form fields
  const resetForm = () => {
    setProjectName('');
    setProjectDescription('');
    setIsEdited(false);
    setEditedId(null);
  };

  return (
    <div>
      {selectedProjectId !== null ? (
        <div>
           hdshahdsah
          <button onClick={goBackToProjects}>Back to Projects</button>
          <KanbanTable id={selectedProjectId} />
        </div>
      ) : (
        <div>
          {/* Project list */}
          <h1>Project List</h1>
          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                {project.id} <strong>{project.name}</strong>: {project.description}
                {!isEdited && (
                  <>
                    <button onClick={() => viewKanban(project.id)}>View Kanban</button>
                    <button onClick={() => goToEdit(project.id)}>Edit</button>
                    <button onClick={() => deleteProject(project.id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>

          {/* Add/Edit Project Form */}
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={handleNameChange}
          />
          <input
            type="text"
            placeholder="Project Description"
            value={projectDescription}
            onChange={handleDescriptionChange}
          />
          {!isEdited ? (
            <button onClick={addProject}>Add Project</button>
          ) : (
            <>
              <button onClick={updateProject}>Update Project</button>
              <button onClick={cancelEdit}>Cancel</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
