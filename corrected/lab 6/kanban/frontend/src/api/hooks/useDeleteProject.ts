import { useMutation } from "@tanstack/react-query"
import { deleteProject } from "../requests/project"
import { useGetProjects } from "./useGetProjects"

export const useDeleteProject = () => {
    const { refetch } = useGetProjects()

    return useMutation({
        mutationFn: deleteProject,
        onError: (error) => {
            console.error("Error deleting project:", error);
        },
        onSuccess: (data) => {
            refetch(); // Refetch projects after deletion
            console.log("Project deleted successfully:", data);
        },
        retry: false, // Disable retries for this mutation
    })
}