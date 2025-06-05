const express = require('express');
const router = express.Router('/projects');

router.get('/', async (req, res) => {
    try {
        const db = req.db;
        const projects = await db.collection('projects').find({}).toArray();
        res.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: 'Error fetching projects' });
    }
})

router.post('/', async (req, res) => {
    try {
        const db = req.db;
        const newProject = req.body;

        if (!newProject.name || !newProject.description) {
            return res.status(400).json({ message: 'Project name and description are required' });
        }

        const result = await db.collection('projects').insertOne(newProject);
        res.status(201).json({ message: 'Project created successfully', projectId: result.insertedId });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: 'Error creating project' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const db = req.db;
        const projectId = req.params.id;

        const result = await db.collection('projects').deleteOne({ _id: new require('mongodb').ObjectId(projectId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: 'Error deleting project' });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const db = req.db;
        const projectId = req.params.id;
        const updatedProject = req.body;

        if (!updatedProject.name || !updatedProject.description) {
            return res.status(400).json({ message: 'Project name and description are required' });
        }

        const result = await db.collection('projects').updateOne(
            { _id: new require('mongodb').ObjectId(projectId) },
            { $set: updatedProject }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json({ message: 'Project updated successfully' });
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: 'Error updating project' });
    }
});

module.exports = router;