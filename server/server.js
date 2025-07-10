// // const express = require('express');
// // const cors = require('cors');
// // const sequelize = require('./config/db');
// // const User = require('./models/EcilData');  // Import User model
// // require('dotenv').config();

// // const app = express();

// // app.use(cors());
// // app.use(express.json());

// // // User routes
// // const userRoutes = require('./routes/user');
// // app.use('/api/users', userRoutes);

// // // Test route
// // app.get('/', (req, res) => {
// //   res.send('API is running...');
// // });

// // // Sync models and start server
// // sequelize.sync()  // sync() creates tables if they don't exist
// //   .then(() => {
// //     console.log('✅ Database & tables synced');
// //     return sequelize.authenticate();
// //   })
// //   .then(() => {
// //     console.log('✅ MySQL connected');
// //     const PORT = process.env.PORT || 5000;
// //     app.listen(PORT, () => {
// //       console.log(`🚀 Server started on port ${PORT}`);
// //     });
// //   })
// //   .catch(err => {
// //     console.error('❌ Error connecting to the database:', err);
// //   });



// const express = require('express');
// const cors = require('cors');
// const sequelize = require('./config/db');
// const User = require('./models/EcilData');  // Sequelize model for `users` table
// require('dotenv').config();
// const changePasswordRoute = require('./routes/changePassword');
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Routes
// const userRoutes = require('./routes/user');
// app.use('/api/users', userRoutes);
// app.use('/', changePasswordRoute);
// // Root endpoint
// app.get('/', (req, res) => {
//   res.send('✅ API is running...');
// });

// // DB Sync and Server Start
// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('✅ MySQL connected');

//     await sequelize.sync(); // Sync models with DB
//     console.log('✅ Database & tables synced');

//     app.listen(PORT, () => {
//       console.log(`🚀 Server running at http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error('❌ Failed to connect or sync with DB:', error);
//   }
// })();






const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const User = require('./models/EcilData'); // Sequelize model for `users` table
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/user');
const changePasswordRoute = require('./routes/changePassword');

app.use('/api/users', userRoutes);                // User-related routes
app.use('/api', changePasswordRoute);             // Password change route

// Root test route
app.get('/', (req, res) => {
  res.send('✅ API is running...');
});

// Start server and sync database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connected');

    await sequelize.sync(); // Sync models with DB
    console.log('✅ Database & tables synced');

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect or sync with DB:', error);
  }
})();
