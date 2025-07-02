import { Button, Card, Col, Container } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { useGetStory } from "../api/hooks/story/useGetStory";

export const Story = () => {
    const { projectId, storyId } = useParams<{ projectId: string, storyId: string }>();

    const { data, isLoading } = useGetStory({ projectId: projectId!, storyId: storyId! });

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (!data) {
        return <h1>Story not found</h1>;
    }

    return (
        <Container>
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <div>
                        <h1>Story</h1>
                    </div>
                    <Link to={`/projects/${projectId}/story/create`}>
                        <Button>Create story</Button>
                    </Link>
                </Card.Header>

                <Card.Body className="d-flex flex-wrap justify-content-around">
                    <Col className="text-center">
                        <Card>
                            <Card.Header>{data.title}</Card.Header>
                            <Card.Body>
                                <div>
                                    Priority: {data.priority}
                                </div>
                                <div>
                                    {data.description}
                                </div>
                                <div>
                                    <Link to={`/projects/${projectId}/story/${data._id}`}>
                                        <Button variant="primary">View Story</Button>
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Card.Body>
            </Card>
        </Container>
    )
}