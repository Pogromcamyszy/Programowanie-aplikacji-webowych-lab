import { useParams, Link } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import type { ITask } from "./Tasks";
import { useGetTasks } from "../api/hooks/useGetTasks";
import { useDeleteTask } from "../api/hooks/useDeleteTask";

function Task({ task, projectId, storyId }: { task: ITask, projectId: string, storyId: string }) {
    const { mutateAsync: deleteTask } = useDeleteTask();

    return (<Row key={task._id} className="mb-2">
        <Card>
            <Card.Header>{task.name}</Card.Header>
            <Card.Body>
                <div>
                    Priority: {task.priority}
                </div>
                <div>
                    {task.description}
                </div>
                <div>
                    {task.assignedUserId}
                </div>
                <div>
                    <Link to={`/projects/${projectId}/story/${storyId}/task/${task._id}`} className="ms-2">
                        <Button variant="primary">Edit Task</Button>
                    </Link>
                    <Button variant="danger" className="m-2" onClick={() => deleteTask({ projectId, storyId, taskId: task._id })}>Delete</Button>

                </div>

            </Card.Body>
        </Card>
    </Row>)
}

function Tasks() {
    const { projectId, storyId } = useParams<{ projectId: string, storyId: string }>();
    const { data: tasks, isLoading } = useGetTasks({ projectId: projectId!, storyId: storyId! });


    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (!tasks) {
        return <h1>No tasks found</h1>;
    }


    console.log("Tasks data:", tasks);

    return (
        <Container>
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <div>
                        <h1>Tasks</h1>
                        <div>Manage and track your team projects</div>
                    </div>
                    <Link to={`/projects/${projectId}/story/${storyId}/task/create`}>
                        <Button>Create task</Button>
                    </Link>
                </Card.Header>

                <Card.Body className="d-flex flex-wrap justify-content-around">
                    <Col className="text-center">
                        <Card>
                            <Card.Header>TODO</Card.Header>
                            <Card.Body>
                                {tasks?.todo.map((task => <Task key={task._id} task={task} projectId={projectId!} storyId={storyId!} />))}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="text-center px-2">
                        <Card>
                            <Card.Header>DOING</Card.Header>
                            <Card.Body>
                                {tasks?.["in-progress"].map((task => <Task key={task._id} task={task} projectId={projectId!} storyId={storyId!} />))}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="text-center">
                        <Card>
                            <Card.Header>DONE</Card.Header>
                            <Card.Body>
                                {tasks?.done.map((task => <Task key={task._id} task={task} projectId={projectId!} storyId={storyId!} />))}
                            </Card.Body>
                        </Card>
                    </Col>
                </Card.Body>
            </Card>
        </Container>
    )

}

export default Tasks;
