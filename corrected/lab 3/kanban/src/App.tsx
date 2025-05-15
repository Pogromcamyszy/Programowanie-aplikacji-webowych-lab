import Projects from "./Projects/ProjectsComponent";
import Stories from "./Stories/StoriesComponent"
import Task from "./Task/TaskComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {

  return (
    <>
        <Router>
          <Routes>
           <Route path="/" element={<Projects/>}/>
           <Route path="/stories/:id" element={<Stories />} />
           <Route path="/task/:id" element={<Task />} />
           </Routes>
        </Router>
    </>
  )
}

export default App
