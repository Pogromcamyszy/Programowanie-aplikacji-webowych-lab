import { useQuery } from "@tanstack/react-query"
import { getProject } from "../requests/project"

export const useGetProject = (id?: string) => {
    return useQuery({
        queryFn: () => getProject(id!),
        queryKey: ["project", id],
        enabled: !!id
    })
}