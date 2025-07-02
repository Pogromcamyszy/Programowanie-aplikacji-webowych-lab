import { useQuery } from "@tanstack/react-query"
import { getMe } from "../requests/user"

export const useGetMe = () => {
    return useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const response = await getMe()

            return response
        },
        retry: false,
    })
}