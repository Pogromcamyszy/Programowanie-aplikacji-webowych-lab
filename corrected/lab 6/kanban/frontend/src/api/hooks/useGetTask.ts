import { useQuery } from "@tanstack/react-query";
import type { ITask } from "../../Task/Tasks";
import { getTask } from "../requests/task";


export const useGetTask = ({ projectId, storyId, taskId }: { projectId?: string, storyId?: string, taskId?: string }) => {
    return useQuery<ITask>(
        {
            queryKey: ['task', projectId, storyId, taskId],
            queryFn: () => getTask({ projectId: projectId!, storyId: storyId!, taskId: taskId! }),
            enabled: !!projectId && !!storyId && !!taskId,
        }
    );
}