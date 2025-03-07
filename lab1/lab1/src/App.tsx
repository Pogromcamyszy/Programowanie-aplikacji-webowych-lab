import { useState, useEffect } from "react";
import "./App.css";

interface IProject {
  id: number;
  name: string;
  description: string;
}

class Project implements IProject {
  id: number;
  name: string;
  description: string;

  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    if (localStorage.getItem("projects") === null) {
      localStorage.setItem("projects", JSON.stringify([]));
    } else {
      const storedProjects = JSON.parse(localStorage.getItem("projects") as string);
      setProjects(storedProjects);
    }
  }, []);

  function addProject() {
    const name = (document.querySelector('input[name="name"]') as HTMLInputElement).value;
    const description = (document.querySelector('input[name="description"]') as HTMLInputElement).value;

    if (name.trim() === "" || description.trim() === "") {
      alert("Please fill in both fields.");
      return;
    }

    const newId = projects.length > 0 ? projects[projects.length - 1].id + 1 : 1;
    const newProject = new Project(newId, name, description);
    const updatedProjects = [...projects, newProject];

    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  }

  function deleteProject(id: number) {
    const updatedProjects = projects.filter((proj) => proj.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  }

  function startEditing(project: Project) {
    setEditingProject(project);
  }

  function saveEdit() {
    if (!editingProject) return;

    const updatedProjects = projects.map((proj) =>
      proj.id === editingProject.id ? editingProject : proj
    );

    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    setEditingProject(null); 
  }

  return (
    <>
      <h2>Projects List</h2>
      {projects.length === 0 ? <p>No projects found.</p> : null}
      <ol>
        {projects.map((proj) => (
          <li key={proj.id}>
            <strong>{proj.name}</strong>: {proj.description} 
            <button onClick={() => startEditing(proj)}>Edit</button>
            <button onClick={() => deleteProject(proj.id)}>Delete</button>
          </li>
        ))}
      </ol>

      {editingProject ? (
        <>
          <h3>Edit Project</h3>
          <input
            type="text"
            value={editingProject.name}
            onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
          />
          <br />
          <input
            type="text"
            value={editingProject.description}
            onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
          />
          <br />
          <button onClick={saveEdit}>Save Changes</button>
          <button onClick={() => setEditingProject(null)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>Add New Project</h3>
          <input type="text" name="name" placeholder="Project Name" required />
          <br />
          <input type="text" name="description" placeholder="Description" required />
          <br />
          <button onClick={addProject}>Add Project</button>
        </>
      )}
    </>
  );
}

export default App;
