import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ITask } from "../../Task/Tasks"
import { createTask, updateTask, type ITaskQueryParams } from "../requests/task"



export const useUpsertTask = ({ projectId, storyId }: Omit<ITaskQueryParams, 'taskId'>, taskId?: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: Omit<ITask, "_id">) => {
            if (!taskId) {
                return createTask({ projectId, storyId }, data)
            }

            return updateTask({ projectId, storyId, taskId }, data)
        },
        onError: (error) => {
            console.error("Error creating project:", error);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['task'] })
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            queryClient.invalidateQueries({ queryKey: ['story'] })

            console.log("Project created successfully:", data);
        },
        retry: false, // Disable retries for this mutation
    })
}