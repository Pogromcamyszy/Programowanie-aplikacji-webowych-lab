import { useParams, Link } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useGetStories } from "../api/hooks/story/useGetStories";
import type { IStory } from "./Stories";

// Login

// Project's stories component



function Story({ story }: { story: IStory }) {
  return (<Row key={story._id} className="mb-2">
    <Card>
      <Card.Header>{story.title}</Card.Header>
      <Card.Body>
        {story.description}
      </Card.Body>
    </Card>
  </Row>
  )
}

function Stories() {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: stories, isLoading, error } = useGetStories(projectId!);

  console.log("Stories data:", stories);

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

    </Container >
  )

}

export default Stories;
