const express = require('express');
const router = express.Router();
const md5 = require('md5');
const EcilData = require('../models/EcilData');


router.post('/change-password', async (req, res) => {
  const { user_id, oldPassword, newPassword } = req.body;

  try {
    const user = await EcilData.findOne({ where: { user_id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password !== md5(oldPassword)) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    user.password = md5(newPassword);
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
