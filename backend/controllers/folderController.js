const Folder = require('../models/Folder');

const createFolder = async (req, res) => {
    const { name } = req.body;
    try {
        const folder = await Folder.create({ name, user: req.user.id });
        res.status(201).json(folder);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getFolders = async (req, res) => {
    try {
        const folders = await Folder.find({ user: req.user.id }).populate('forms');
        res.json(folders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteFolder = async (req, res) => {
    const { id } = req.params;
    try {
        await Folder.findByIdAndDelete(id);
        res.json({ message: 'Folder deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createFolder, getFolders, deleteFolder };
