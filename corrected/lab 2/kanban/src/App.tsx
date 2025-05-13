import Projects from "./Projects/ProjectsComponent";
import Stories from "./Stories/StoriesComponent"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {

  return (
    <>
        <Router>
          <Routes>
           <Route path="/" element={<Projects/>}/>
           <Route path="/stories/:id" element={<Stories />} />
           </Routes>
        </Router>
    </>
  )
}

export default App
