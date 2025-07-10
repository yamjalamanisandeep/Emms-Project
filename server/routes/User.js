

// const express = require('express');
// const router = express.Router();

// // POST /api/users/login
// router.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   // Hardcoded credentials
//   if (username === 'sandy' && password === '123') {
//     return res.json({ success: true, message: 'Login successful' });
//   }

//   res.status(401).json({ success: false, message: 'Invalid credentials' });
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const EcilData = require('../models/EcilData');
// const md5 = require('md5');  // use md5 instead of bcrypt for your current setup

// // POST /api/users/login
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await EcilData.findOne({ where: { user_id: username } });

//     if (!user) {
//       return res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }

//     const inputPasswordHash = md5(password); // Convert entered password to MD5
//     if (inputPasswordHash !== user.password) {
//       return res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }

//     res.json({
//       success: true,
//       message: 'Login successful',
//       user: {
//         user_id: user.user_id,
//         emp_codeno: user.emp_codeno,
//         valid: user.valid
//       }
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

// module.exports = router;





const express = require('express');
const router = express.Router();
const EcilData = require('../models/EcilData');
const md5 = require('md5');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await EcilData.findOne({ where: { user_id: username } });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const inputPasswordHash = md5(password);
    if (inputPasswordHash !== user.password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.json({ 
      success: true,
      message: 'Login successful',
      user: {
        user_id: user.user_id,
        emp_codeno: user.emp_codeno,
        full_name: '',  // no employee_master lookup
        valid: user.valid
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
