import Projects from "./Projects/ProjectsComponent";
import Stories from "./Stories/StoriesComponent"
import Task from "./Task/TasksComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {

  return (
    <>
        <Router>
          <Routes>
           <Route path="/" element={<Projects/>}/>
           <Route path="/:projectId/story" element={<Stories />} />
           <Route path="/:projectId/story/:storyId/task" element={<Task />} />
           <Route path="/:projectId/story/:storyId/task/:taskId" element={<Task />} />
           </Routes>
        </Router>
    </>
  )
}

export default App
