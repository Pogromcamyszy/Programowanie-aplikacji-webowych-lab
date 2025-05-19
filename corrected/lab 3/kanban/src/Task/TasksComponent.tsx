import { useParams, Link } from "react-router-dom";

function Task(){

    const { id } = useParams();
    return(
        <div>
            <h1>Task {id}</h1>
            <Link to="/">Back to Projects</Link>
        </div>
    )
}

export default Task;