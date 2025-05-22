import Projects from "./Projects/ProjectsComponent";
import Stories from "./Stories/StoriesComponent"
import Task from "./Task/TasksComponent";
import Login from "./Login/LoginComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {

  return (
    <>
        <Router>
          <Routes>
           <Route path="/" element={<Projects/>}/>
           <Route path="/:projectId/story" element={<Stories />} />
           <Route path="/:projectId/story/:storyId/task" element={<Task />} />
           <Route path="/login" element={<Login/>} />
           </Routes>
        </Router>
    </>
  )
}

export default App
