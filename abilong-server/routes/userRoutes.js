const express = require('express');

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  signupUser,
  updateUsername,
  changePassword
} = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', signupUser);

router.route('/').get(protect, adminOnly, getUsers).post(protect, adminOnly, createUser);
router.route('/:id').put(protect, adminOnly, updateUser).delete(protect, adminOnly, deleteUser);
router.put('/:id/username', protect, updateUsername);
router.put('/:id/password', protect, changePassword);

module.exports = router;