import { Button, Card, Container, InputGroup } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useUpsertProject } from "../api/hooks/useUpsertProject";
import { toast } from "react-toastify";
import { useGetProject } from "../api/hooks/useGetProject";
import { useEffect, useMemo } from "react";

interface ProjectFormValues {
    name: string;
    description: string;
}

export const ProjectForm = () => {
    const { projectId } = useParams<{ projectId: string }>()

    const { data, isLoading } = useGetProject(projectId)

    const { handleSubmit, register, reset } = useForm<ProjectFormValues>()

    const { mutateAsync, isPending } = useUpsertProject(projectId)

    const navigate = useNavigate()

    const onSubmit = async (data: ProjectFormValues) => {
        console.log("Form submitted with data:", data);

        await mutateAsync(data, {
            onSuccess: () => {
                toast("Project created successfully!")
                navigate('/')
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
                name: data.name,
                description: data.description
            })
        }
    }, [projectId, data])


    if (projectId && isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <Container>
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <div>
                        <h1>Create Project</h1>
                    </div>
                    <Link to="/">
                        <Button variant="secondary">Back to project list</Button>
                    </Link>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={handleSubmit(onSubmit)} key={projectId}>
                        <InputGroup.Text>Project Name</InputGroup.Text>
                        <input type="text" className="form-control mb-3" placeholder="Enter project name" {...register('name')} />
                        <InputGroup.Text>Project Descriptipon</InputGroup.Text>
                        <input type="text" className="form-control mb-3" placeholder="Enter project description" {...register('description')} />
                        <Button type="submit" disabled={isPending} className="btn btn-primary mt-2">
                            {isPending ? isPendingText : upsertText}
                        </Button>
                    </form>
                </Card.Body>
            </Card>
        </Container>
    )
}