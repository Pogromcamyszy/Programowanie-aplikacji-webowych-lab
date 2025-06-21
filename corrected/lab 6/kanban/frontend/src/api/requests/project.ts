import type { IProject } from "../../Projects/Project";
import { axiosInstance } from "./axios";


export const getProjects = async (): Promise<IProject[]> => {
    try {
        const response = await axiosInstance("/projects");
        if (response.status !== 200) {
            throw new Error("Failed to fetch projects");
        }
        return response.data
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
    }
}

export const getProject = async (id: string): Promise<IProject> => {
    try {
        const response = await axiosInstance(`/projects/${id}`);
        if (response.status !== 200) {
            throw new Error("Failed to fetch projects");
        }
        return response.data
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
    }
}

export const createProject = async (project: Omit<IProject, '_id'>): Promise<IProject> => {
    try {
        const response = await axiosInstance.post("/projects", project);
        if (response.status !== 200 && response.status !== 201) {
            throw new Error("Failed to create project");
        }
        return response.data;
    } catch (error) {
        console.error("Error creating project:", error);
        throw error;
    }
}

export const updateProject = async (id: string, project: Omit<IProject, '_id'>): Promise<IProject> => {
    try {
        const response = await axiosInstance.put(`/projects/${id}`, project);
        if (response.status !== 200) {
            throw new Error("Failed to update project");
        }
        return response.data;
    } catch (error) {
        console.error("Error updating project:", error);
        throw error;
    }
}

export const deleteProject = async (id: string): Promise<void> => {
    try {
        const response = await axiosInstance.delete(`/projects/${id}`);
        if (response.status !== 200) {
            throw new Error("Failed to delete project");
        }
    } catch (error) {
        console.error("Error deleting project:", error);
        throw error;
    }
}