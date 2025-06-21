const express = require('express');
const router = express.Router({ mergeParams: true });
const Story = require('../models/story.js');

const { ObjectId } = require('mongoose').Types;


router.get('/', async (req, res) => {
    const { projectId } = req.params;

    console.log("Project ID:", projectId);

    try {
        const storyList = await Story.find({ projectId: projectId });

        console.log("Story List:", storyList);

        const stories = await Story.aggregate([
            { $match: { projectId: new ObjectId(projectId) } },
            {
                "$group": {
                    _id: null,
                    todo: {
                        $push: { $cond: [{ $eq: ["$status", "todo"] }, "$$ROOT", "$$REMOVE"] }
                    },
                    doing: {
                        $push: { $cond: [{ $eq: ["$status", "doing"] }, "$$ROOT", "$$REMOVE"] }
                    },
                    done: {
                        $push: { $cond: [{ $eq: ["$status", "done"] }, "$$ROOT", "$$REMOVE"] }
                    },
                }
            }
        ]);
        res.status(200).json(stories[0] || { todo: [], doing: [], done: [] });
    } catch (error) {
        console.error("Error fetching stories:", error);
        res.status(500).json({ message: 'Error fetching stories' });
    }
});

router.post('/', async (req, res) => {
    const { title, description, priority, status } = req.body;

    const { projectId } = req.params;

    console.log("Project ID:", projectId);

    if (!title || !description || !projectId || !priority || !status) {
        return res.status(400).json({ message: 'Story title, description, and project ID are required' });
    }


    // FIX THIS => use user from the auth middleware
    const ownerId = '6856977a991f7654430220fb'

    try {
        const newStory = new Story({ title, description, priority, status, ownerId, projectId });
        await newStory.save();
        res.status(201).json({ message: 'Story created successfully', storyId: newStory._id });
    } catch (error) {
        console.error("Error creating story:", error);
        res.status(500).json({ message: 'Error creating story' });
    }
});

router.put('/:id', async (req, res) => {
    const { title, description, priority, status } = req.body;
    const { id, projectId } = req.params;


    if (!id || !title || !description || !projectId || !priority || !status) {
        return res.status(400).json({ message: 'Story title, description, and project ID are required' });
    }

    const ownerId = '6856977a991f7654430220fb'

    try {
        const updatedStory = await Story.findByIdAndUpdate(id, { title, description, priority, status, ownerId, projectId }, { new: true });
        if (!updatedStory) {
            return res.status(404).json({ message: 'Story not found' });
        }
        res.status(200).json({ message: 'Story updated successfully', story: updatedStory });
    } catch (error) {
        console.error("Error updating story:", error);
        res.status(500).json({ message: 'Error updating story' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Story ID is required' });
    }

    try {
        const deletedStory = await Story.findByIdAndDelete(id);
        if (!deletedStory) {
            return res.status(404).json({ message: 'Story not found' });
        }
        res.status(200).json({ message: 'Story deleted successfully' });
    } catch (error) {
        console.error("Error deleting Story:", error);
        res.status(500).json({ message: 'Error deleting Story' });
    }
});

module.exports = router;