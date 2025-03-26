import { useState, useEffect } from 'react';
import { IProject, Project } from './Project/Project.tsx';
import { ProjectManager } from './ProjectMeneger/ProjectMeneger.tsx';

function App() {

  const projectManager = new ProjectManager();

  const [projects, setProjects] = useState<IProject[]>([]);
  const [projectName, setProjectName] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [editedId, setEditedId] = useState<number>(0);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectDescription(e.target.value);
  };

  const addProject = () => {
    const project = new Project(projectName, projectDescription);
    projectManager.addProject(project);
    setProjectName('');
    setProjectDescription('');
    setProjects(projectManager.getProjects()); // Update the list after adding
  };

  const editProject = () => {
    projectManager.editProject(editedId, projectName, projectDescription);
    setIsEdited(false);
    setEditedId(0);
    setProjectName('');
    setProjectDescription('');
  }

  const goToEdit = (id: number) => {
    const project = projectManager.getProject(id);
    setProjectName(project.name);
    setProjectDescription(project.description);
    setIsEdited(true);
    setEditedId(id);
  }

  const deleteProject = (id: number) => {
    projectManager.deleteProject(id);
    setProjects(projectManager.getProjects());
  }
  
  const cancelEdit = () => {
    setIsEdited(false);
    setEditedId(0);
  }

  useEffect(() => {
    setProjects(projectManager.getProjects());
  }, [projects]);  

  return (
    <div>
      <h1>Project List</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.id} <strong>{project.name}</strong>: {project.description} 
            {!isEdited && (
              <>
              <button onClick={() => goToEdit(project.id)}>Edit</button>
              <button onClick={() => deleteProject(project.id)}>Delete</button>
              </>
              ) }
          </li>
        ))}
      </ul>
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
     {!isEdited &&(
      <>
      <button onClick={addProject}>Add Project</button>
      </>)}

    {isEdited &&(
    <>
    <button onClick={() => {editProject()}}>Edit project</button>
    <button onClick={() => {cancelEdit()}}>Cancel</button>
    </>
    )}
  
  </div>);
}

export default App;
