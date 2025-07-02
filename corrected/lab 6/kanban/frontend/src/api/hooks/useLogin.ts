import { useMutation } from "@tanstack/react-query"
import { login } from "../requests/user"
import { useGetMe } from "./useMe"

export const useLogin = () => {
    const { refetch } = useGetMe()

    return useMutation({
        mutationFn: login,
        onSuccess: () => {
            refetch()
        },
    })
}