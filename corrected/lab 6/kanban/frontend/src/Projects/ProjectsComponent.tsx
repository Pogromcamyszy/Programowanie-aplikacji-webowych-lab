import { useEffect, useState } from "react";
import {Project} from "../Projects/Project";
import type {IProject} from "../Projects/Project";
import {Storage} from "../Storage/storage";
import { Link } from "react-router-dom";
function Projects() {
  
    const storage = new Storage();
    const [projects, setProjects] = useState<IProject[]>([]);
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isEdited, setIsEdited] = useState(false);
    const [editedId, setEditedId] = useState<number | null>(null);
    
    function addProject() {
      if (!projectName.trim() || !projectDescription.trim()) {
        setErrorMsg("Please fill in all fields");
        return;
      } 
        setErrorMsg("");
        const newProject = new Project(projectName, projectDescription);
        storage.addProject(newProject);
        setProjects(storage.getProjects());
    }

    function deleteProject(id: number) {
        storage.removeProject(id);
        setProjects(storage.getProjects());
    }

    function editProject() {
        if (!projectName.trim() || !projectDescription.trim()) {
        setErrorMsg("Please fill in all fields");
        return;
      } 
        setErrorMsg("");
        storage.editProject(editedId, projectName, projectDescription);
        setProjects(storage.getProjects());
        setIsEdited(false);
    }

    useEffect(() => {
        setProjects(storage.getProjects());
    }, []);

  return (
    <>  
         {isEdited && (
  <>
    <h1>Edit Project</h1>
    <h2>{errorMsg}</h2>
    {projects.map((project) =>
      project.id === editedId ? (
        <div key={project.id}>
          <h2>{project.id}</h2>
          <h3>Name: {project.name}</h3>
          <p>Description: {project.description}</p>
        </div>
      ) : null
    )}
    <button onClick={() => setIsEdited(false)}>Back</button>
    <br />
    <input
      type="text"
      value={projectName}
      onChange={(e) => setProjectName(e.target.value)}
      placeholder="Project Name"
      required
    />
    <input
      type="text"
      value={projectDescription}
      onChange={(e) => setProjectDescription(e.target.value)}
      placeholder="Project Description"
      required
    />
    <button onClick={editProject}>Edit Project</button>
  </>
)}

    {!isEdited && (
      <>
        <h1>Projects</h1>
        <h2>{errorMsg}</h2>
        <input type="text" value  ={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project Name" required />
        <input type="text" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} placeholder="Project Description" required />
        <button onClick={addProject}>Add Project</button>

        <ul>
            {projects.map((project) => (
                <li key={project.id}>
                    <Link to={`${project.id}/story/`}>
                    <h2>{project.id}</h2>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    </Link>
                    <button onClick={() => deleteProject(project.id)}>Delete</button>
                    <button onClick={() => { setEditedId(project.id); setIsEdited(true);}}>Edit</button>                   
                </li>
            ))}
        </ul>
        </>)}
    </>
  )
}

export default Projects;
