import { Link } from "react-router-dom";
import { useGetProjects } from "../api/hooks/useGetProjects";
import { Button, Card, Container } from "react-bootstrap";
import { useDeleteProject } from "../api/hooks/useDeleteProject";


function Projects() {
  const { data: projects, isLoading, error } = useGetProjects();


  const { mutateAsync: deleteProject } = useDeleteProject();



  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <Container>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div>
            <h1>Projects</h1>
            <div>Manage and track your team projects</div>
          </div>
          <Link to="/projects/create">
            <Button>Create Project</Button>
          </Link>
        </Card.Header>

        <Card.Body className="d-flex flex-wrap justify-content-around">
          {projects?.map((project) => (
            <Card style={{ width: "18rem" }} key={project._id} className="mb-3">
              <Card.Body>
                <Card.Title>{project.name}</Card.Title>
                <Card.Text>
                  {project.description}
                </Card.Text>
                <Link to={`/projects/${project._id}/story/`}>
                  <Button variant="secondary" className="m-2">View Stories</Button>
                </Link>
                <Button variant="danger" className="m-2" onClick={() => deleteProject(project._id)}>Delete</Button>
                <Link to={`/projects/${project._id}`}>
                  <Button variant="secondary" className="m-2" >Edit</Button>
                </Link>

              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>

    </Container >
  )
}

export default Projects;
