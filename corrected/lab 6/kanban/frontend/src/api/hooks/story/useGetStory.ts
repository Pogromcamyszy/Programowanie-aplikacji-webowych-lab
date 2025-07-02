import { useQuery } from "@tanstack/react-query";
import type { IStory } from "../../../Stories/Stories";
import { getStory } from "../../requests/story";

export const useGetStory = ({ projectId, storyId }: { projectId?: string, storyId?: string }) => {
    return useQuery<IStory>(
        {
            queryKey: ['story', projectId, storyId],
            queryFn: () => getStory(projectId!, storyId!),
            enabled: !!projectId && !!storyId,
        }
    );
}