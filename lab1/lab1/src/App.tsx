import { useState, useEffect } from "react";
import "./App.css";

interface Iproject {
  id: number;
  name: string;
  description: string;
}

class Project implements Iproject {
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
  
  ///read localstorage and set useeffect at start
  useEffect(() => {
    if (localStorage.getItem("projects") === null) {
      localStorage.setItem("projects", JSON.stringify([]));
    } else {
      const storedProjects = JSON.parse(localStorage.getItem("projects") as string);
      setProjects(storedProjects);
    }
  }, []);
   
  //adds project to use effect and then upload useeffect to localstorage
  function addProject() {
    const name = (document.querySelector('input[name="name"]') as HTMLInputElement).value;
    const description = (document.querySelector('input[name="description"]') as HTMLInputElement).value;

    if(name.trim() === "" || description.trim() === "") {
      alert("Please fill in both fields.");
      return;
    }

    if (!name || !description) {
      alert("Please fill in both fields.");
      return;
    }

    const newId = projects.length > 0 ? projects[projects.length - 1].id + 1 : 1;
    const newProject = new Project(newId, name, description);
    const updatedProjects = [...projects, newProject];

    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  }
  
  ///filter project id from localuse effect then update localstorage with new project
  function deleteProject(id: number) {
    const updatedProjects = projects.filter((proj) => proj.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  }

  return (
    <>
      <h2>Projects List</h2>
      {projects.length === 0 ? <p>No projects found.</p> : null}
      <ul>
        {projects.map((proj) => (
          <li key={proj.id}>
            <strong>{proj.name}</strong>: {proj.description} <button onClick={() => deleteProject(proj.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <input type="text" name="name" placeholder="Project Name" required />
      <br />
      <input type="text" name="description" placeholder="Description" required />
      <br />
      <button onClick={addProject}>Add Project</button>
    </>
  );
}

export default App;