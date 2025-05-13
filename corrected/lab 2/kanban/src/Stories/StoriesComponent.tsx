import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserManager } from "../Users/UserManager";
import {User} from "../Users/Users";
import type { IStory } from "../Stories/Stories";
import { Storage } from "../Storage/storage";
import { useEffect,useState} from "react";
function Detail() {

  const { id } = useParams();
  const projectId = id ? parseInt(id) : null;
  const user = new User("John", "Doe");
  const userManager = new UserManager(user);
  const storage = new Storage();
  
  const [stories, setStories] = useState<IStory[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("todo");

  return (
    <div>
      <h2>Detail Page for Item {projectId}</h2>
      <h3>Logged in user: {userManager.getLoggedInUser().getFullName()}</h3>
      <Link to={"/"}>
        <button>Go back to projects</button>
      </Link>
    </div>
  );
}

export default Detail;