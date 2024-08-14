import express from 'express';
import cors from 'cors';
import pino from 'pino'; 

const { createLogger } = pino; 

const setupServer = () => {
  const app = express();

  app.use(cors());
  const logger = createLogger();

  
  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });


  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};

export { setupServer };
