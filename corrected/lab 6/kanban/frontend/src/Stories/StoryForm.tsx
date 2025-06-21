import { Button, Card, Container, InputGroup } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useUpsertProject } from "../api/hooks/useUpsertProject";
import { toast } from "react-toastify";
import { useGetProject } from "../api/hooks/useGetProject";
import { useEffect, useMemo } from "react";
import type { IStory } from "./Stories";
import { useUpsertStory } from "../api/hooks/story/useUpsertStory";

type StoryFormValues = Omit<IStory, '_id'>;

export const StoryForm = () => {
    const { projectId, storyId } = useParams<{ projectId: string, storyId: string }>()

    // const { data, isLoading } = useGetStory(projectId)

    const { handleSubmit, register, reset } = useForm<StoryFormValues>()

    const { mutateAsync, isPending } = useUpsertStory(storyId)

    const navigate = useNavigate()

    const onSubmit = async (data: StoryFormValues) => {
        console.log("Form submitted with data:", data);

        await mutateAsync({ ...data, projectId: projectId! }, {
            onSuccess: () => {
                toast("Project created successfully!")
                navigate('/projects/' + projectId + '/story')
            }
        });
    }

    const [upsertText, isPendingText] = useMemo(() => {
        if (projectId) {
            return ['Update project', 'Updating Project...',]
        }
        return ['Create project', 'Creating project...']
    }, [projectId])


    // useEffect(() => {
    //     if (projectId && data) {
    //         console.log("Resetting form with data:", data);
    //         reset({
    //             name: data.name,
    //             description: data.description
    //         })
    //     }
    // }, [projectId, data])


    // if (projectId && isLoading) {
    //     return <h1>Loading...</h1>
    // }

    return (
        <Container>
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <div>
                        <h1>Create Story</h1>
                    </div>
                    <Link to="/">
                        <Button variant="secondary">Back to project list</Button>
                    </Link>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={handleSubmit(onSubmit)} key={projectId}>
                        <InputGroup.Text>Project Name</InputGroup.Text>
                        <input type="text" className="form-control mb-3" placeholder="Enter project name" {...register('title')} />
                        <InputGroup.Text>Project Descriptipon</InputGroup.Text>
                        <input type="text" className="form-control mb-3" placeholder="Enter project description" {...register('description')} />
                        <InputGroup.Text>Story Status</InputGroup.Text>
                        <select className="form-select mb-3" {...register('status')}>
                            <option value="todo">TODO</option>
                            <option value="doing">DOING</option>
                            <option value="done">DONE</option>
                        </select>
                        <InputGroup.Text>Story Priority</InputGroup.Text>
                        <select className="form-select mb-3" {...register('priority')}>
                            <option value="low">LOW</option>
                            <option value="medium">MEDIUM</option>
                            <option value="high">HIGH</option>
                        </select>
                        <Button type="submit" disabled={isPending} className="btn btn-primary mt-2">
                            {isPending ? isPendingText : upsertText}
                        </Button>
                    </form>
                </Card.Body>
            </Card>
        </Container>
    )
}