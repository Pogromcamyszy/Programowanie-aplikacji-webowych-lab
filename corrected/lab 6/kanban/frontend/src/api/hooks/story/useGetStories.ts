import { useQuery } from "@tanstack/react-query";
import { getStories } from "../../requests/story";

export const useGetStories = (projectId: string) => {
    return useQuery({
        queryFn: () => getStories(projectId!),
        queryKey: ["stories", projectId],
    });
}