import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;

// Async wrapper to start server after DB connection
const startServer = async () => {
  try {
    await connectDB(); // Connect to DB first
    console.log("✅ Database connected");

    // Middlewares
    app.use(cors());
    app.use(express.json());

    // Routes
    app.get('/', (req, res) => res.send("API is Working"));
    app.use('/api/admin', adminRouter);
    app.use('/api/blog', blogRouter);

    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Error starting server:", error.message);
    process.exit(1); // Exit with failure
  }
};

startServer(); // Call the async function to start
