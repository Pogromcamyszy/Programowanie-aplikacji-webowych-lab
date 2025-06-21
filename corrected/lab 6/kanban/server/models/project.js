const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);