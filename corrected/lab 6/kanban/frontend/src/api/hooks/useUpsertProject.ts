import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProject, updateProject } from "../requests/project"
import type { IProject } from "../../Projects/Project"

export const useUpsertProject = (id?: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: Omit<IProject, "_id">) => {
            if (!id) {
                return createProject(data)
            }

            return updateProject(id, data)
        },
        onError: (error) => {
            console.error("Error creating project:", error);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            queryClient.invalidateQueries({ queryKey: ['project'] })

            console.log("Project created successfully:", data);
        },
        retry: false, // Disable retries for this mutation
    })
}