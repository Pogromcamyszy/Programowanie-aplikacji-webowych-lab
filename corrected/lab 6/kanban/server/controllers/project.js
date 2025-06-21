const express = require('express');
const router = express.Router();
const Project = require('../models/project.js');

router.get('/', async (_req, res) => {
    try {
        const projects = await Project.find({});
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: 'Error fetching projects' });
    }
});


router.get('/:projectId', async (_req, res) => {
    const projectId = _req.params.projectId;

    try {
        const project = await Project.findById(projectId);
        res.status(200).json(project);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: 'Error fetching projects' });
    }
});


router.post('/', async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: 'Project name and description are required' });
    }

    try {
        const newProject = new Project({ name, description });
        await newProject.save();
        res.status(201).json({ message: 'Project created successfully', projectId: newProject._id });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: 'Error creating project' });
    }

});

router.put('/:id', async (req, res) => {
    const { name, description } = req.body;
    const id = req.params.id;

    if (!id || !name || !description) {
        return res.status(400).json({ message: 'Project ID, name, and description are required' });
    }

    try {
        const updatedProject = await Project.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: 'Error updating project' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: 'Project ID is required' });
    }

    try {
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: 'Error deleting project' });
    }
});

module.exports = router;