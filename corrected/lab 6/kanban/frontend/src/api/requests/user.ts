import axios from "axios";
import type { IUser } from "../../Users/Users";
import { axiosInstance } from "./axios";

export const getMe = async (): Promise<IUser> => {
    try {
        const response = await axiosInstance(`/users/me`);
        if (response.status !== 200) {
            throw new Error("Failed to fetch user");
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching stories:", error);
        throw error;
    }
}

export const getAccessToken = async (): Promise<string | null> => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/refresh_token`, {}, { withCredentials: true });
        if (response.status !== 200) {
            throw new Error("Failed to fetch access token");
        }

        return response.data.token;
    } catch (error) {
        console.error("Error fetching access token:", error);
        return null
    }
}

export const login = async ({ email, password }: { email: string, password: string }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, { email, password }, { withCredentials: true })

        if (response.status !== 200) {
            throw new Error("Failed to log in")
        }

        return response.data
    } catch (error) {
        console.error("Error logging in:", error)
        throw error
    }
}

export const logout = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`, {}, { withCredentials: true })

        if (response.status !== 200) {
            throw new Error("Failed to log out")
        }

    } catch (error) {
        console.error("Error logging out:", error)
        throw error
    }
}