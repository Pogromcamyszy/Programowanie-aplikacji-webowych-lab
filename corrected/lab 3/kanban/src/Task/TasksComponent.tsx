import { useParams, Link } from "react-router-dom";
import {userList} from "../Users/Users";
import {Task} from "../Task/Tasks";
import type {TaskPriority} from "../Task/Tasks";
import {Storage} from "../Storage/Storage";
import { useEffect, useState } from "react";

function Tasks(){

    const { projectId,storyId,taskId } = useParams();

    const storage = new Storage();

    const [task, setTasks] = useState<Task[]>();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const taskName = formData.get("taskName") as string;
        const description = formData.get("description") as string;
        const priority = formData.get("priority") as TaskPriority;
        const estimatedHours = parseInt(formData.get("estimatedHours") as string);
        const assignedUserId = parseInt(formData.get("assignedUserId") as string);
        const task = new Task(taskName, description, priority, parseInt(storyId!), estimatedHours, assignedUserId);
        storage.addTask(task)
        setTasks(storage.getTasks(parseInt(storyId!)));
    }

    useEffect(() => {
        setTasks(storage.getTasks(parseInt(storyId!)));
    }, []);

    return(
        <div>
            <h1>Task {storyId}</h1>
            <Link to="/">Back to Projects</Link><br/>
            <Link to={`/${projectId}/story/`}>Back to Stories</Link>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Task Name" name="taskName" required/><br/>
                <textarea placeholder="Task Description" name="description" required></textarea><br/>
                <label>Priority:</label>    
                <select name="priority" required>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select><br/>
                <label>Estimated Hours:</label>
                <input type="number" name="estimatedHours" placeholder="Estimated Hours" required/><br/>
                <label>Assigned User:</label>
                <select name="assignedUserId">
                    <option value=" ">Select User</option>
                    {userList
                   .filter(user => user.getRole() === 'developer' || user.getRole() === 'devops')
                   .map(user => (
                    <option key={user.id} value={user.id}>
                   {user.getFullName()}
                     </option>
                     
           ))}
                </select><br/>
                <button type="submit">Create Task</button>
            </form>

            <h2>Tasks</h2>
            {task && task.length > 0 ? (
                task.map((task) => (
                    <div key={task.id}>
                        <h3>{task.name}</h3>
                        <p>Description: {task.description}</p>
                        <p>Priority: {task.priority}</p>
                        <p>Status: {task.status}</p>
                        <p>Estimated Hours: {task.estimatedHours}</p>
                        <p>Assigned User Id: {task.assignedUserId}</p>
                        <p>Created At: {task.createdAt}</p>
                    </div>
                ))
            ) : (
                <p>No tasks available.</p>
            )}
        </div>
    )
}

export default Tasks;