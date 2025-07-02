import Projects from "./Projects/ProjectsComponent";
import Stories from "./Stories/StoriesComponent"
// import Task from "./Task/TasksComponent";
import Login from "./Login/LoginComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProjectForm } from "./Projects/ProjectForm";
import { ToastContainer } from "react-toastify";
import { StoryForm } from "./Stories/StoryForm";
import Tasks from "./Task/TasksComponent";
import { TaskForm } from "./Task/TaskForm";
import { Button, Card, Container } from "react-bootstrap";
import { useState } from "react";
import { useLogout } from "./api/hooks/useLogout";
import { useGetMe } from "./api/hooks/useMe";


function App() {
  const { mutateAsync: logout } = useLogout()
  const [theme, setTheme] = useState("light");

  const { data } = useGetMe()

  return (
    <>
      <Router>
        <Card data-bs-theme={theme} className={`d-flex  flex-column vh-100 rounded-0 ${theme === "dark" && "unifrakturmaguntia-regular"}`}>
          <Container className="d-flex justify-content-between align-items-center flex-row my-4">
            {data && <Button onClick={() => logout()}>Logout</Button>}
            <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Change theme</Button>
          </Container>
          <Routes>
            <Route path="/" element={<Login />}>
              <Route path="/" element={<Projects />} />
              <Route path="/projects/create" element={<ProjectForm />} />
              <Route path="/projects/:projectId" element={<ProjectForm />} />
              <Route path="/projects/:projectId/story" element={<Stories />} />
              <Route path="/projects/:projectId/story/create" element={<StoryForm />} />
              <Route path="/projects/:projectId/story/:storyId" element={<StoryForm />} />
              <Route path="/projects/:projectId/story/:storyId/task" element={<Tasks />} />
              <Route path="/projects/:projectId/story/:storyId/task/create" element={<TaskForm />} />
              <Route path="/projects/:projectId/story/:storyId/task/:taskId" element={<TaskForm />} />
            </Route>
          </Routes>
        </Card>
      </Router >
      <ToastContainer />
    </>
  )
}

export default App
