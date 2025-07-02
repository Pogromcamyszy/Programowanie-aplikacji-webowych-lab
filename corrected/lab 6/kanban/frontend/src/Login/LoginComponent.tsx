import { Outlet } from "react-router-dom";
import { useGetMe } from "../api/hooks/useMe";
import { useLogin } from "../api/hooks/useLogin";

function Login() {
    const { data, isLoading } = useGetMe()


    const { mutateAsync, isPending } = useLogin()

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (!data) {
        return <div>
            <h1>Login</h1>
            <form onSubmit={async (e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const email = formData.get('email') as string
                const password = formData.get('password') as string

                await mutateAsync({ email, password })
            }}>
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit" disabled={isPending}>Login</button>
            </form>
        </div>
    }

    return <Outlet />
}

export default Login;