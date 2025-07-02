import type { IStory } from "../../Stories/Stories";
import { axiosInstance } from "./axios";

export const getStories = async (projectId: string): Promise<{ todo: IStory[], doing: IStory[], done: IStory[] }> => {
    try {
        const response = await axiosInstance(`/projects/${projectId}/stories`);
        if (response.status !== 200) {
            throw new Error("Failed to fetch stories");
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching stories:", error);
        throw error;
    }
}

export const getStory = async (projectId: string, storyId: string): Promise<IStory> => {
    try {
        const response = await axiosInstance(`/projects/${projectId}/stories/${storyId}`);
        if (response.status !== 200) {
            throw new Error("Failed to fetch story");
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching story:", error);
        throw error;
    }
}

export const createStory = async (story: Omit<IStory, '_id'>): Promise<IStory> => {
    try {
        const response = await axiosInstance.post(`/projects/${story.projectId}/stories`, story);
        if (response.status !== 200 && response.status !== 201) {
            throw new Error("Failed to create story");
        }
        return response.data;
    } catch (error) {
        console.error("Error creating story:", error);
        throw error;
    }
}

export const updateStory = async (storyId: string, story: Omit<IStory, '_id'>): Promise<IStory> => {
    try {
        const response = await axiosInstance.put(`/projects/${story.projectId}/stories/${storyId}`, story);
        if (response.status !== 200) {
            throw new Error("Failed to update story");
        }
        return response.data;
    } catch (error) {
        console.error("Error updating story:", error);
        throw error;
    }
}

export const deleteStory = async ({ projectId, storyId }: { projectId: string, storyId: string }): Promise<void> => {
    try {
        const response = await axiosInstance.delete(`/projects/${projectId}/stories/${storyId}`);
        if (response.status !== 200) {
            throw new Error("Failed to delete story");
        }
    } catch (error) {
        console.error("Error deleting story:", error);
        throw error;
    }
}