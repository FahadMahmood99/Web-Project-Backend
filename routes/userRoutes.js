const express = require('express');
const router = express.Router();
const { 
  getUsers, 
  createUser, 
  deleteUser 
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// Admin-only routes
router.get('/', protect, admin, getUsers);       // GET /api/users
router.post('/', protect, admin, createUser);   // POST /api/users
router.delete('/:id', protect, admin, deleteUser); // DELETE /api/users/:id

module.exports = router;