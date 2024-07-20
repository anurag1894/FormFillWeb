const express = require('express');
const { createFolder, getFolders, deleteFolder } = require('../controllers/folderController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createFolder);
router.get('/', auth, getFolders);
router.delete('/:id', auth, deleteFolder);

module.exports = router;
