const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, required: true, enum: ['low', 'medium', 'high'] },
    storyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Story', required: true },
    estimatedHours: { type: Number, required: true },
    status: { type: String, required: true, enum: ['todo', 'in-progress', 'done'] },
    startedAt: { type: Date },
    finishedAt: { type: Date },
    assignedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);