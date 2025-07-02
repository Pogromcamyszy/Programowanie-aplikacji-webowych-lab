import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../requests/task";

export const useDeleteTask = () => {
    const queryClient = useQueryClient()


    return useMutation({
        mutationFn: deleteTask,
        onError: (error) => {
            console.error("Error deleting project:", error);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            queryClient.invalidateQueries({ queryKey: ['task'] })

            console.log("Project deleted successfully:", data);
        },
        retry: false, // Disable retries for this mutation
    });
}