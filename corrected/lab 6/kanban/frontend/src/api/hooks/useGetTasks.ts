import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../requests/task";

export const useGetTasks = ({ projectId, storyId }: { projectId: string, storyId: string }) => {
    return useQuery({
        queryFn: () => getTasks({ projectId, storyId }),
        queryKey: ["tasks", projectId],
    });
}