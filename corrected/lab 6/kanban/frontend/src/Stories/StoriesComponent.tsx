import { useParams, Link } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useGetStories } from "../api/hooks/story/useGetStories";
import type { IStory } from "./Stories";
import { useDeleteStory } from "../api/hooks/useDeleteStory";

function Story({ story }: { story: IStory }) {
  const { mutateAsync: deleteStory } = useDeleteStory()

  return (<Row key={story._id} className="mb-2">
    <Card>
      <Card.Header>{story.title}</Card.Header>
      <Card.Body>
        <div>
          Priority: {story.priority}
        </div>
        <div>
          {story.description}
        </div>
        <div>
          {story.ownerId}
        </div>
        <div>
          <Link to={`/projects/${story.projectId}/story/${story._id}/task`}>
            <Button variant="primary">View Story</Button>
          </Link>
          <Link to={`/projects/${story.projectId}/story/${story._id}`} className="ms-2">
            <Button variant="primary">Edit Story</Button>
          </Link>
          <Button variant="danger" className="m-2" onClick={() => deleteStory({ projectId: story.projectId, storyId: story._id })}>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  </Row>
  )
}

function Stories() {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: stories, isLoading } = useGetStories(projectId!);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div>
            <h1>Stories</h1>
            <div>Manage and track your team projects</div>
          </div>
          <Link to={`/projects/${projectId}/story/create`}>
            <Button>Create story</Button>
          </Link>
        </Card.Header>

        <Card.Body className="d-flex flex-wrap justify-content-around">
          <Col className="text-center">
            <Card>
              <Card.Header>TODO</Card.Header>
              <Card.Body>
                {stories?.todo.map((story => <Story key={story._id} story={story} />))}
              </Card.Body>
            </Card>
          </Col>
          <Col className="text-center px-2">
            <Card>
              <Card.Header>DOING</Card.Header>
              <Card.Body>
                {stories?.doing.map((story => <Story key={story._id} story={story} />))}
              </Card.Body>
            </Card>
          </Col>
          <Col className="text-center">
            <Card>
              <Card.Header>DONE</Card.Header>
              <Card.Body>
                {stories?.done.map((story => <Story key={story._id} story={story} />))}
              </Card.Body>
            </Card>
          </Col>
        </Card.Body>
      </Card>
    </Container>
  )

}

export default Stories;
