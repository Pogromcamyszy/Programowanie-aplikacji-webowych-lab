import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { IStory } from "../../../Stories/Stories"
import { createStory, updateStory } from "../../requests/story"

export const useUpsertStory = (id?: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: Omit<IStory, "_id">) => {
            if (!id) {
                return createStory(data)
            }

            return updateStory(id, data)
        },
        onError: (error) => {
            console.error("Error creating project:", error);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['story'] })
            queryClient.invalidateQueries({ queryKey: ['stories'] })
            queryClient.invalidateQueries({ queryKey: ['project'] })

            console.log("Project created successfully:", data);
        },
        retry: false, // Disable retries for this mutation
    })
}