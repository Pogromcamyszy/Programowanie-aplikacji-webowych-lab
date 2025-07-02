import { useMutation } from "@tanstack/react-query"
import { logout } from "../requests/user"

export const useLogout = () => {
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            window.location.href = "/"
        },
    })
}