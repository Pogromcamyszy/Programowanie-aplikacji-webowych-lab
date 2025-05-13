import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserManager } from "../Users/UserManager";
import { User } from "../Users/Users";
import type { IStory } from "../Stories/Stories";
import { Story } from "../Stories/Stories"; 
import { Storage } from "../Storage/storage";

function Detail() {
  const { id } = useParams();
  const projectId = id ? parseInt(id) : null;
  const user = new User(1,"John", "Doe");
  const userManager = new UserManager(user);
  const storage = new Storage();

  const [stories, setStories] = useState<IStory[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("todo");

  useEffect(() => {
    if (projectId) {
      const fetchedStories = storage.getStories(projectId);
      setStories(fetchedStories);
    } else {
      setErrorMsg("Project ID is not valid");
    }
  }, [projectId]);

  const addStory = () => {
    if (!projectId) return;

    const newStory = new Story(
      title,
      description,
      priority,
      projectId,
      status,
      user.id
    );

    storage.addStory(newStory);
    setStories(storage.getStories(projectId)); 
    setTitle("");
    setDescription("");
    setPriority("low");
    setStatus("todo");
  };

  return (
    <>
      <div>
        <h2>Detail Page for Item {projectId}</h2>
        <h3>Logged in user: {userManager.getLoggedInUser().getFullName()}</h3>
        <Link to={"/"}>
          <button>Go back to projects</button>
        </Link>

        <h4>Add new story</h4>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <button onClick={addStory}>Add Story</button>
      </div>

      <div>
        <h3>Stories</h3>
        {stories.length > 0 ? (
          stories.map((story) => (
            <div key={story.id}>
              <h4>{story.title}</h4>
              <p>{story.description}</p>
              <p>Priority: {story.priority}</p>
              <p>Status: {story.status}</p>
              <p>User: {story.ownerId}</p>
            </div>
          ))
        ) : (
          <p>No stories found for this project.</p>
        )}
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      </div>
    </>
  );
}

export default Detail;
