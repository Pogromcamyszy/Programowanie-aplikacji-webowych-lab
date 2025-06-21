import { useQuery } from "@tanstack/react-query"
import { getProjects } from "../requests/project"

export const useGetProjects = () => {
    return useQuery({
        queryFn: () => getProjects(),
        queryKey: ["projects"],
    })
}