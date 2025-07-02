import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStory } from "../requests/story";

export const useDeleteStory = () => {
    const queryClient = useQueryClient()


    return useMutation({
        mutationFn: deleteStory,
        onError: (error) => {
            console.error("Error deleting project:", error);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['stories'] })
            queryClient.invalidateQueries({ queryKey: ['story'] })

            console.log("Project deleted successfully:", data);
        },
        retry: false, // Disable retries for this mutation
    });
}