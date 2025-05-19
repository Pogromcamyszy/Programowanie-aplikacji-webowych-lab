import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserManager } from "../Users/UserManager";
import { User } from "../Users/Users";
import type { IStory } from "../Stories/Stories";
import { Story } from "../Stories/Stories";
import { Storage } from "../Storage/storage";

function Stories() {
  const { projectId : id } = useParams();
  const projectId = id ? parseInt(id) : null;
  const user = new User(1, "John", "Doe", "admin");
  const userManager = new UserManager(user);
  const storage = new Storage();

  const [stories, setStories] = useState<IStory[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [editedId, setEditedId] = useState<number | null>(null);
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

    if (!title.trim() || !description.trim()) {
      setErrorMsg("Title and description are required");
      return;
    }

    const newStory = new Story(title, description, priority, projectId, status, user.id);
    storage.addStory(newStory);
    setStories(storage.getStories(projectId));
    resetForm();
  };

  const removeStory = (storyId: number) => {
    storage.removeStory(storyId);
    setStories(storage.getStories(projectId));
  };

  const editStory = (storyId: number | null) => {
    if (!projectId || storyId === null) return;

    if (!title.trim() || !description.trim()) {
      setErrorMsg("Title and description are required to edit");
      return;
    }

    storage.editStory(storyId, title, description, priority, status);
    setStories(storage.getStories(projectId));
    resetForm();
    setIsEdited(false);
    setEditedId(null);
  };

  const startEditing = (story: IStory) => {
    setIsEdited(true);
    setEditedId(story.id);
    setTitle(story.title);
    setDescription(story.description);
    setPriority(story.priority);
    setStatus(story.status);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("low");
    setStatus("todo");
    setErrorMsg("");
  };

  return (
    <>
      {isEdited ? (
        <div>
          <h2>Edit Story</h2>
          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
          <Link to={"/"}>
            <button>Go back to projects</button>
          </Link>
          <button onClick={() => { setIsEdited(false); setEditedId(null); resetForm(); }}>
            Cancel
          </button>

          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
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
          <button onClick={() => editStory(editedId)}>Save Changes</button>
        </div>
      ) : (
        <>
          <div>
            <h2>Detail Page for Item {projectId}</h2>
            <h3>Logged in user: {userManager.getLoggedInUser().getFullName()}</h3>
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
            <Link to={"/"}>
              <button>Go back to projects</button>
            </Link>

            <h4>Add new story</h4>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
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
            {["todo", "doing", "done"].map((category) => (
              <div key={category}>
                <h1>{category.toUpperCase()}</h1>
                {stories.filter((story) => story.status === category).length > 0 ? (
                  stories
                    .filter((story) => story.status === category)
                    .map((story) => (
                      <div key={story.id}>
                        <Link to={`/${projectId}/story/${story.id}/task`}>
                        <h4>{story.title}</h4>
                        <p>{story.description}</p>
                        <p>Priority: {story.priority}</p>
                        <p>Status: {story.status}</p>
                        <p>User Id: {story.ownerId}</p>
                        <p>Project Id: {story.projectId}</p>
                        </Link>
                        <p>
                        Date: {new Date(story.createdAt).toLocaleDateString()}{" "}
                       {new Date(story.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <button onClick={() => removeStory(story.id)}>Remove</button>
                        <button onClick={() => startEditing(story)}>Edit</button>
                      </div>
                    ))
                ) : (
                  <p>No {category} stories.</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Stories;
