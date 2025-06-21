import Projects from "./Projects/ProjectsComponent";
import Stories from "./Stories/StoriesComponent"
import Task from "./Task/TasksComponent";
import Login from "./Login/LoginComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProjectForm } from "./Projects/ProjectForm";
import { ToastContainer } from "react-toastify";
import { StoryForm } from "./Stories/StoryForm";
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/projects/create" element={<ProjectForm />} />
          <Route path="/projects/:projectId" element={<ProjectForm />} />
          <Route path="/projects/:projectId/story" element={<Stories />} />
          <Route path="/projects/:projectId/story/create" element={<StoryForm />} />
          <Route path="/:projectId/story/:storyId/task" element={<Task />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
