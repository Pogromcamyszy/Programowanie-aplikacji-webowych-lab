import { UserManager } from "../Users/Users";
import type { ITask } from "./Tasks";

interface TaskEditProps {
    task: ITask;
    handleEdit: (event: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

function TasksEdit({ task, onChangeHandler, onCancel, handleEdit }: TaskEditProps) {
    const userManager = new UserManager();
    const developers = userManager.getDevelopersAndDevOps();

    return <>
        <h1>Editing Task {task.id}</h1>
        <button onClick={onCancel}>Cancel Edit</button>
        <form onSubmit={handleEdit}>
            <input type="text" name="name" value={task.name} onChange={onChangeHandler} required /><br />
            <textarea name="description" value={task.description} onChange={onChangeHandler} required></textarea><br />
            <label>Priority:</label>
            <select name="priority" value={task.priority} onChange={onChangeHandler} required>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select><br />
            <label>Estimated Hours:</label>
            <input type="number" name="estimatedHours" min="1" value={task.estimatedHours ?? ""} onChange={onChangeHandler} required /><br />
            <label>Assigned User:</label>
            <select name="assignedUserId" value={task.assignedUserId ?? ""} onChange={onChangeHandler}>
                <option value="">Select Developer/DevOps</option>
                {developers.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.getFullName()}
                    </option>
                ))}
            </select><br />
            <label>Status:</label>
            <select name="status" value={task.status} onChange={onChangeHandler} required>
                <option value="todo">Not Started</option>
                <option value="doing">In Progress</option>
                <option value="done">Completed</option>
            </select><br />
            <button type="submit">Edit task</button>
        </form>
    </>
}

export default TasksEdit;