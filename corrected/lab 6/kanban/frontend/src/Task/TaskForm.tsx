import { Button, Card, Container, InputGroup } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"

import { toast } from "react-toastify";

import { useEffect, useMemo } from "react";
import type { ITask } from "./Tasks";
import { useGetTask } from "../api/hooks/useGetTask";
import { useUpsertTask } from "../api/hooks/useUpsertTask";

type StoryFormValues = Omit<ITask, '_id'>;

export const TaskForm = () => {
    const { projectId, storyId, taskId } = useParams<{ projectId: string, storyId: string, taskId: string }>()
    const { data, isLoading } = useGetTask({ projectId, storyId, taskId })

    const { handleSubmit, register, reset } = useForm<StoryFormValues>()

    const { mutateAsync, isPending } = useUpsertTask({ projectId: projectId!, storyId: storyId! }, taskId)

    const navigate = useNavigate()

    const onSubmit = async (data: StoryFormValues) => {
        console.log("Form submitted with data:", data);

        await mutateAsync({ ...data, }, {
            onSuccess: () => {
                toast("Story created successfully!")
                navigate('/projects/' + projectId + '/story/' + storyId + '/task')
            }
        });
    }

    const [upsertText, isPendingText] = useMemo(() => {
        if (projectId) {
            return ['Update project', 'Updating Project...',]
        }
        return ['Create project', 'Creating project...']
    }, [projectId])


    useEffect(() => {
        if (projectId && data) {
            console.log("Resetting form with data:", data);
            reset({
                ...data
            })
        }
    }, [projectId, storyId, taskId, data])


    if (projectId && isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <Container>
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <div>
                        <h1>Create Story</h1>
                    </div>
                    <Link to={`/projects/${projectId}/story`}>
                        <Button variant="secondary">Back to story list</Button>
                    </Link>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={handleSubmit(onSubmit)} key={projectId}>
                        <InputGroup.Text>Task Name</InputGroup.Text>
                        <input type="text" className="form-control mb-3" placeholder="Enter task name" {...register('name')} />
                        <InputGroup.Text>Project Descriptipon</InputGroup.Text>
                        <input type="text" className="form-control mb-3" placeholder="Enter task description" {...register('description')} />
                        <InputGroup.Text>Estimated hours</InputGroup.Text>
                        <input type="number" className="form-control mb-3" placeholder="Enter task description" {...register('estimatedHours')} />

                        <InputGroup.Text>Task Status</InputGroup.Text>
                        <select className="form-select mb-3" {...register('status')}>
                            <option value="todo">TODO</option>
                            <option value="in-progress">DOING</option>
                            <option value="done">DONE</option>
                        </select>

                        <InputGroup.Text>Story Priority</InputGroup.Text>
                        <select className="form-select mb-3" {...register('priority')}>
                            <option value="low">LOW</option>
                            <option value="medium">MEDIUM</option>
                            <option value="high">HIGH</option>
                        </select>

                        <InputGroup.Text>Assigned User</InputGroup.Text>
                        <input type="text" className="form-control mb-3" placeholder="Enter assigned user ID" {...register('assignedUserId')} />

                        <Button type="submit" disabled={isPending} className="btn btn-primary mt-2">
                            {isPending ? isPendingText : upsertText}
                        </Button>
                    </form>
                </Card.Body>
            </Card>
        </Container>
    )
}