import type { ITask } from "../../Task/Tasks";
import { axiosInstance } from "./axios";

export interface ITaskQueryParams {
    projectId: string;
    storyId: string;
    taskId: string;
}

export const getTasks = async ({ projectId, storyId }: Omit<ITaskQueryParams, 'taskId'>): Promise<{ todo: ITask[], "in-progress": ITask[], done: ITask[] }> => {
    try {
        const response = await axiosInstance(`/projects/${projectId}/stories/${storyId}/tasks`);
        if (response.status !== 200) {
            throw new Error("Failed to fetch stories");
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching stories:", error);
        throw error;
    }
}

export const getTask = async ({ projectId, storyId, taskId }: ITaskQueryParams): Promise<ITask> => {
    try {
        const response = await axiosInstance(`/projects/${projectId}/stories/${storyId}/tasks/${taskId}`);

        if (response.status !== 200) {
            throw new Error("Failed to fetch story");
        }

        return response.data;
    } catch (error) {
        console.error("Error fetching story:", error);
        throw error;
    }
}

export const createTask = async ({ projectId, storyId }: Omit<ITaskQueryParams, 'taskId'>, task: Omit<ITask, '_id'>): Promise<ITask> => {
    try {
        const response = await axiosInstance.post(`/projects/${projectId}/stories/${storyId}/tasks`, task);

        if (response.status !== 200 && response.status !== 201) {
            throw new Error("Failed to create story");
        }

        return response.data;
    } catch (error) {
        console.error("Error creating story:", error);
        throw error;
    }
}

export const updateTask = async ({ projectId, storyId, taskId }: ITaskQueryParams, task: Omit<ITask, '_id'>): Promise<ITask> => {
    try {
        const response = await axiosInstance.put(`/projects/${projectId}/stories/${storyId}/tasks/${taskId}`, task);
        if (response.status !== 200 && response.status !== 201) {
            throw new Error("Failed to update story");
        }
        return response.data;
    } catch (error) {
        console.error("Error updating story:", error);
        throw error;
    }
}

export const deleteTask = async ({ projectId, storyId, taskId }: ITaskQueryParams): Promise<void> => {
    try {
        const response = await axiosInstance.delete(`/projects/${projectId}/stories/${storyId}/tasks/${taskId}`);
        if (response.status !== 200) {
            throw new Error("Failed to delete task");
        }
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
}