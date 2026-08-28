import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { corsMiddleware } from './config/cors';
import { config } from './config/env';

const app = express();

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
  frameguard: false
}));

// CORS Configuration
app.use(corsMiddleware);

// Parsers
app.use(express.json({ limit: '50kb' }));
app.use(cookieParser());

// Rate Limiting
import { apiLimiter } from './middleware/rate-limit.middleware';
app.use('/api/', apiLimiter);

// Uploads (protect sensitive static files)
import { protectSensitiveFiles } from './middleware/upload.middleware';
import path from 'path';
import expressStatic from 'express';
app.use('/uploads', protectSensitiveFiles, expressStatic.static(path.join(__dirname, '..', 'uploads')));
app.use('/api/uploads', protectSensitiveFiles, expressStatic.static(path.join(__dirname, '..', 'uploads')));

// Base Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', environment: config.env });
});

// Routes
import authRoutes from './routes/auth.routes';
import financialRoutes from './routes/financial.routes';
import contactRoutes from './routes/contact.routes';
import serviceRoutes from './routes/service.routes';
import enquiryRoutes from './routes/enquiry.routes';
import membershipRoutes from './routes/membership.routes';
import entityRoutes from './routes/entity.routes';
import educationRoutes from './routes/education.routes';
import businessConsultancyRoutes from './routes/business-consultancy.routes';
import cooperativeTradingRoutes from './routes/cooperative-trading.routes';

app.use('/api', authRoutes);
app.use('/api', financialRoutes);
app.use('/api', contactRoutes);
app.use('/api', serviceRoutes);
app.use('/api', enquiryRoutes);
app.use('/api', membershipRoutes);
app.use('/api', entityRoutes);
app.use('/api', educationRoutes);
app.use('/api', businessConsultancyRoutes);
app.use('/api', cooperativeTradingRoutes);

// Note: Error handling and 404 middleware should be added at the end
import { notFoundMiddleware } from './middleware/not-found.middleware';
import { errorMiddleware } from './middleware/error.middleware';

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
