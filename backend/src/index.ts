import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

// --- SECURITY MIDDLEWARE ---

// Standard security headers
app.use(helmet());

// Rate limiting to prevent Brute Force/DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Strict CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

// --- AUTH MIDDLEWARE ---
const apiKeyAuth = (req: Request, res: Response, next: any) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// --- MEMBERSHIP ROUTES ---

app.post('/api/membership', async (req: Request, res: Response) => {
  try {
    const { fullName, fatherName, email, mobileNumber, address, membershipType } = req.body;
    const member = await prisma.member.create({
      data: { 
        fullName, 
        fatherName, 
        email, 
        mobileNumber, 
        address, 
        membershipType 
      },
    });
    res.status(201).json(member);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/membership', apiKeyAuth, async (_req: Request, res: Response) => {
  const members = await prisma.member.findMany();
  res.json(members);
});

app.get('/api/members', apiKeyAuth, async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const where: any = {};
    
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(String(startDate));
      if (endDate) {
        const end = new Date(String(endDate));
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }

    const members = await prisma.member.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(members);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/members/export', apiKeyAuth, async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const where: any = {};
    
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(String(startDate));
      if (endDate) {
        const end = new Date(String(endDate));
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }

    const members = await prisma.member.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(members);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/scheme-stats', apiKeyAuth, async (_req: Request, res: Response) => {
  try {
    const grouped = await prisma.member.groupBy({
      by: ['membershipType'],
      _count: { id: true },
    });
    const total = await prisma.member.count();
    res.json({ schemes: grouped, total });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- PRODUCT ROUTES ---

app.get('/api/products', async (req: Request, res: Response) => {
  const { category } = req.query;
  const where = category ? { category: String(category) } : {};
  const products = await prisma.product.findMany({ where });
  res.json(products);
});

app.get('/api/products/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const product = await prisma.product.findUnique({
      where: { slug }
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.create({ data: req.body });
    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// --- PROJECT ROUTES ---

app.get('/api/projects', async (_req: Request, res: Response) => {
  const projects = await prisma.project.findMany();
  res.json(projects);
});

app.get('/api/projects/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const project = await prisma.project.findUnique({
      where: { slug }
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects', async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.create({ data: req.body });
    res.status(201).json(project);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// --- ENQUIRY ROUTES ---

app.post('/api/enquiry', async (req: Request, res: Response) => {
  try {
    const { name, phone, email, location, plan, message } = req.body;
    const enquiry = await prisma.lead.create({
      data: { name, phone, email, location, plan, message },
    });
    res.status(201).json(enquiry);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/enquiries', apiKeyAuth, async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const where: any = {};
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(String(startDate));
      if (endDate) {
        const end = new Date(String(endDate));
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }
    const enquiries = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(enquiries);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/enquiries/export', apiKeyAuth, async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const where: any = {};
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(String(startDate));
      if (endDate) {
        const end = new Date(String(endDate));
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }
    const enquiries = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(enquiries);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/enquiry/:id', apiKeyAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await prisma.lead.update({
      where: { id },
      data: { status }
    });
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/enquiry/:id', apiKeyAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.lead.delete({ where: { id } });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// --- FINANCIAL ENQUIRY ROUTES ---

app.post('/api/financial-enquiry', async (req: Request, res: Response) => {
  try {
    const { fullName, phoneNumber, email, city, investmentAmount, selectedScheme, message } = req.body;
    const enquiry = await prisma.financialSchemeEnquiry.create({
      data: { fullName, phoneNumber, email, city, investmentAmount, selectedScheme, message },
    });
    res.status(201).json(enquiry);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/admin/financial-enquiries', apiKeyAuth, async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const where: any = {};
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(String(startDate));
      if (endDate) {
        const end = new Date(String(endDate));
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }
    const enquiries = await prisma.financialSchemeEnquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(enquiries);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/financial-enquiries/export', apiKeyAuth, async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const where: any = {};
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(String(startDate));
      if (endDate) {
        const end = new Date(String(endDate));
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }
    const enquiries = await prisma.financialSchemeEnquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(enquiries);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/financial-enquiries/:id', apiKeyAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.financialSchemeEnquiry.delete({ where: { id } });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// --- ORDER ROUTES ---

app.get('/api/orders', apiKeyAuth, async (_req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' }
  });
  res.json(orders);
});

// --- SERVICE REQUEST ROUTES ---

app.post('/api/service-request', async (req: Request, res: Response) => {
  try {
    const { fullName, mobile, email, serviceCategory, selectedService, notes } = req.body;
    const request = await prisma.serviceRequest.create({
      data: { fullName, mobile, email, serviceCategory, selectedService, notes },
    });
    res.status(201).json(request);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/services', async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, category } = req.query;
    const where: any = {};
    
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(String(startDate));
      if (endDate) {
        const end = new Date(String(endDate));
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }

    if (category && category !== 'All') {
      where.serviceCategory = String(category);
    }

    const services = await prisma.serviceRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(services);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/services/export', apiKeyAuth, async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, category } = req.query;
    const where: any = {};
    
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(String(startDate));
      if (endDate) {
        const end = new Date(String(endDate));
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }

    if (category && category !== 'All') {
      where.serviceCategory = String(category);
    }

    const services = await prisma.serviceRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(services);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/services/:id/status', apiKeyAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await prisma.serviceRequest.update({
      where: { id },
      data: { status }
    });
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/leadership', async (_req: Request, res: Response) => {
  const team = await prisma.leadership.findMany({
    orderBy: { order: 'asc' }
  });
  res.json(team);
});

app.get('/', (req, res) => {
  res.send('Kalpavruksha API is running');
});

// --- ERROR HANDLING ---

app.use((err: any, _req: Request, res: Response, _next: any) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
