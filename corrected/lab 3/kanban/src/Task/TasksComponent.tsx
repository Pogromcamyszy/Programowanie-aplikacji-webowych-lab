import { useParams, Link } from "react-router-dom";
import { UserManager } from "../Users/Users";
import { Task } from "../Task/Tasks";
import type { TaskPriority } from "../Task/Tasks";
import { Storage } from "../Storage/Storage";
import { useEffect, useState } from "react";

function Tasks() {
  const { projectId, storyId } = useParams();
  const storage = new Storage();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEdited, setIsEdited] = useState(false);
  const [editedId, setEditedId] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<Task | null>(null);

  const userManager = new UserManager();
  const developers = userManager.getDevelopersAndDevOps();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const taskName = formData.get("taskName") as string;
    const description = formData.get("description") as string;
    const priority = formData.get("priority") as TaskPriority;
    const estimatedHours = parseInt(formData.get("estimatedHours") as string);
    const assignedUserId = parseInt(formData.get("assignedUserId") as string);
    if (!storyId) return;
    const task = new Task(taskName, description, priority, parseInt(storyId), estimatedHours, assignedUserId);
    storage.addTask(task);
    setTasks(storage.getTasks(parseInt(storyId)));
    event.currentTarget.reset();
  }

  function startEditing(taskId: number) {
    const taskToEdit = tasks.find(t => t.id === taskId);
    if (!taskToEdit) return;
    setEditedId(taskId);
    setEditedTask({ ...taskToEdit });
    setIsEdited(true);
  }

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    if (!editedTask) return;
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: name === "estimatedHours" || name === "assignedUserId"
        ? value === "" ? null : parseInt(value)
        : value,
    });
  }

  function handleEdit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editedTask || editedId === null) return;
    storage.editTask(
      editedId,
      editedTask.name,
      editedTask.description,
      editedTask.assignedUserId ?? undefined,
      editedTask.estimatedHours ?? 0,
      editedTask.priority,
      editedTask.status
    );
    setTasks(storage.getTasks(parseInt(storyId!)));
    setIsEdited(false);
    setEditedId(null);
    setEditedTask(null);
  }

  function removeTask(taskId: number) {
    storage.removeTask(taskId);
    setTasks(storage.getTasks(parseInt(storyId!)));
  }

  useEffect(() => {
    if (storyId) {
      setTasks(storage.getTasks(parseInt(storyId)));
    }
  }, [storyId]);

  return (
    <div>
      {isEdited && editedTask ? (
        <>
          <h1>Editing Task {editedId}</h1>
          <button onClick={() => { setIsEdited(false); setEditedId(null); setEditedTask(null); }}>Cancel Edit</button>
          <form onSubmit={handleEdit}>
            <input type="text" name="name" value={editedTask.name} onChange={onChangeHandler} required /><br />
            <textarea name="description" value={editedTask.description} onChange={onChangeHandler} required></textarea><br />
            <label>Priority:</label>
            <select name="priority" value={editedTask.priority} onChange={onChangeHandler} required>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select><br />
            <label>Estimated Hours:</label>
            <input type="number" name="estimatedHours" min="1" value={editedTask.estimatedHours ?? ""} onChange={onChangeHandler} required /><br />
            <label>Assigned User:</label>
            <select name="assignedUserId" value={editedTask.assignedUserId ?? ""} onChange={onChangeHandler}>
              <option value="">Select Developer/DevOps</option>
              {developers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.getFullName()}
                </option>
              ))}
            </select><br />
            <label>Status:</label>
            <select name="status" value={editedTask.status} onChange={onChangeHandler} required>
              <option value="todo">Not Started</option>
              <option value="doing">In Progress</option>
              <option value="done">Completed</option>
            </select><br />
            <button type="submit">Edit task</button>
          </form>
        </>
      ) : (
        <>
          <h1>Tasks for Story {storyId}</h1>
          <Link to="/">Back to Projects</Link><br />
          <Link to={`/${projectId}/story/`}>Back to Stories</Link>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Task Name" name="taskName" required /><br />
            <textarea placeholder="Task Description" name="description" required></textarea><br />
            <label>Priority:</label>
            <select name="priority" required>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select><br />
            <label>Estimated Hours:</label>
            <input type="number" name="estimatedHours" min="1" required /><br />
            <label>Assigned User:</label>
            <select name="assignedUserId">
              <option value="">Select Developer/DevOps</option>
              {developers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.getFullName()}
                </option>
              ))}
            </select><br />
            <label>Status:</label>
            <button type="submit">Create Task</button>
          </form>
          <h2>Kanban Board</h2>
          <div>
            <div>
              <h3>To Do</h3>
              {tasks.filter(task => task.status === "todo").length > 0 ? (
                tasks.filter(task => task.status === "todo").map((task) => (
                  <div key={task.id}>
                    <h4>{task.name}</h4>
                    <p>Description: {task.description}</p>
                    <p>Priority: {task.priority}</p>
                    <p>Estimated Hours: {task.estimatedHours}</p>
                    <p>Created At: {task.createdAt}</p>
                    <button onClick={() => removeTask(task.id)}>Remove</button>
                    <button onClick={() => startEditing(task.id)}>Edit</button>
                  </div>
                ))
              ) : (
                <p>No tasks.</p>
              )}
            </div>
            <div>
              <h3>Doing</h3>
              {tasks.filter(task => task.status === "doing").length > 0 ? (
                tasks.filter(task => task.status === "doing").map((task) => (
                  <div key={task.id}>
                    <h4>{task.name}</h4>
                    <p>Description: {task.description}</p>
                    <p>Priority: {task.priority}</p>
                    <p>Assigned to: {task.assignedUserId}</p>
                    <p>Created At: {task.createdAt}</p>                
                    <p>Started At: {task.startedAt}</p>
                    <button onClick={() => removeTask(task.id)}>Remove</button>
                    <button onClick={() => startEditing(task.id)}>Edit</button>
                  </div>
                ))
              ) : (
                <p>No tasks.</p>
              )}
            </div>
            <div>
              <h3>Done</h3>
              {tasks.filter(task => task.status === "done").length > 0 ? (
                tasks.filter(task => task.status === "done").map((task) => (
                  <div key={task.id}>
                    <h4>{task.name}</h4>
                    <p>Description: {task.description}</p>
                    <p>Priority: {task.priority}</p>
                    <p>Assigned to: {task.assignedUserId}</p>
                    <p>Created At: {task.createdAt}</p>                
                    <p>Started At: {task.startedAt}</p>
                    <p>Finished At: {task.finishedAt}</p>
                    <button onClick={() => removeTask(task.id)}>Remove</button>
                    <button onClick={() => startEditing(task.id)}>Edit</button>
                  </div>
                ))
              ) : (
                <p>No tasks.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Tasks;