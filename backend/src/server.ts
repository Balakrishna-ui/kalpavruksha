import app from './app';
import { config } from './config/env';
import prisma from './config/database';

const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('Database connected successfully.');

    // Start Express server
    const server = app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port} in ${config.env} mode.`);
    });

    // Graceful shutdown handlers
    const shutdown = async () => {
      console.log('Shutting down server...');
      server.close();
      await prisma.$disconnect();
      process.exit(0);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
