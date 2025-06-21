const express = require('express');
const router = express.Router({ mergeParams: true });
const Task = require('../models/task.js');
const User = require('../models/user.js');

router.get('/', async (req, res) => {
    const { storyId } = req.params;

    try {
        const stories = await Task.find({ storyId });
        res.status(200).json(stories);
    } catch (error) {
        console.error("Error fetching stories:", error);
        res.status(500).json({ message: 'Error fetching stories' });
    }
});

router.get('/:id', async (req, res) => {
    const { storyId, id } = req.params;

    try {
        const story = await Task.findOne({ storyId, _id: id });

        res.status(200).json(story);
    } catch (error) {
        console.error("Error fetching stories:", error);
        res.status(500).json({ message: 'Error fetching stories' });
    }
});

router.post('/', async (req, res) => {
    const { storyId } = req.params;



    try {
        await upsertTask({ ...req.body, storyId }, res);
    } catch (error) {
        console.error("Error creating story:", error);
        res.status(500).json({ message: 'Error creating story' });
    }
});

const upsertTask = async (data, res) => {
    const {
        id,
        storyId,
        name,
        description,
        priority,
        estimatedHours,
        status,
        assignedUserId
    } = data;


    if (['in-progress', 'done'].includes(status) && !assignedUserId) {
        return res.status(400).json({ message: 'Task in progress or done must have an assigned user' });
    }



    if (!name || !description || !estimatedHours || !priority || !status || !storyId) {
        return res.status(400).json({ message: 'Task name, description, estimated hours, priority, status, and story ID are required' });
    }


    let task;

    if (id) {
        task = await Task.findById(id);

        task.name = name;
        task.description = description;
        task.priority = priority;
        task.estimatedHours = estimatedHours;
        task.status = status;
        task.assignedUserId = assignedUserId;
        task.storyId = storyId;

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
    } else {
        task = new Task({
            name,
            description,
            priority,
            estimatedHours,
            status,
            assignedUserId,
            storyId
        });
    }


    if (assignedUserId) {
        const user = await User.findOne({ _id: assignedUserId, role: { $in: ['devops', 'developer'] } });

        if (!user) {
            return res.status(400).json({ message: 'Assigned user must be a devops or developer' });
        }
    }

    switch (status) {
        case 'in-progress':
            task.startedAt = new Date();
            task.finishedAt = null;
            break;
        case 'done':
            task.startedAt = task.startedAt ?? new Date();
            task.finishedAt = task.finishedAt ?? new Date();
            break;
        default:
            task.startedAt = null;
            task.finishedAt = null;
    }


    await task.save();
    res.status(201).json({ message: `Task ${id ? 'updated' : 'created'} successfully`, task });
}


router.put('/:id', async (req, res) => {
    const { id, storyId } = req.params;



    try {
        await upsertTask({ ...req.body, storyId, id }, res);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: 'Error creating story' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Story ID is required' });
    }

    try {
        const deletedStory = await Task.findByIdAndDelete(id);
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