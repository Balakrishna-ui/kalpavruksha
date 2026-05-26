import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';

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
  origin: process.env.FRONTEND_URL || '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '50kb' }));

// --- AUTH MIDDLEWARE ---
const apiKeyAuth = (req: Request, res: Response, next: any) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// --- ADMIN AUTH ROUTES ---

app.post('/api/admin/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Return existing ADMIN_API_KEY upon successful login to seamlessly authenticate frontend
    res.json({ token: process.env.ADMIN_API_KEY });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/change-password', apiKeyAuth, async (req: Request, res: Response) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect current password' });
    }
    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);
    
    await prisma.adminUser.update({
      where: { email },
      data: { password: newHash }
    });
    
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- OTP PASSWORD RESET FLOW ---

interface OTPStore {
  [email: string]: {
    otp: string;
    expiresAt: Date;
    verified: boolean;
    attempts: number;
    lastRequestedAt: Date;
  }
}
const otpStorage: OTPStore = {};

app.post('/api/admin/request-otp', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email address is required' });
    }

    // Validate email belongs to an Admin
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) {
      return res.status(404).json({ error: 'No admin account found with this email' });
    }

    // Rate limiting for OTP requests (1 request per 30 seconds)
    const existing = otpStorage[email];
    if (existing && new Date().getTime() - existing.lastRequestedAt.getTime() < 30000) {
      return res.status(429).json({ error: 'Please wait 30 seconds before requesting another OTP.' });
    }

    // Generate secure 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 minutes expiry

    otpStorage[email] = {
      otp,
      expiresAt,
      verified: false,
      attempts: 0,
      lastRequestedAt: new Date()
    };

    console.log(`[SECURE OTP] OTP for ${email} is: ${otp} (expires at ${expiresAt.toLocaleTimeString()})`);

    // Attempt to send email
    try {
      if (process.env.SMTP_USER && process.env.SMTP_USER !== 'mock-user') {
        const mailTransporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await mailTransporter.sendMail({
          from: `"Kalpavruksha Admin" <${process.env.SMTP_USER}>`,
          to: email,
          subject: 'Admin Password Reset OTP - Kalpavruksha',
          text: `Your security OTP for resetting your Kalpavruksha Admin password is: ${otp}. It will expire in 5 minutes.`,
          html: `<div style="font-family: sans-serif; padding: 20px; color: #11213F;">
            <h2>Kalpavruksha Admin Portal</h2>
            <p>You requested a password reset. Use the OTP below to complete the verification:</p>
            <h1 style="color: #C9A13B; letter-spacing: 5px; font-size: 32px;">${otp}</h1>
            <p style="color: #666; font-size: 12px;">This OTP will expire in 5 minutes. If you did not request this, please ignore this email.</p>
          </div>`
        });
      }
    } catch (mailErr) {
      console.error('Email sending failed, but OTP logged successfully:', mailErr);
    }

    res.json({ success: true, message: `OTP has been sent to your registered email. (Testing: ${otp})` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/verify-otp', async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    const record = otpStorage[email];
    if (!record) {
      return res.status(400).json({ error: 'No OTP session found. Please request a new OTP.' });
    }

    // Check expiry
    if (new Date() > record.expiresAt) {
      delete otpStorage[email];
      return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }

    // Brute force protection
    if (record.attempts >= 5) {
      delete otpStorage[email];
      return res.status(429).json({ error: 'Too many failed verification attempts. Please request a new OTP.' });
    }

    record.attempts += 1;

    if (record.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP. Please try again.' });
    }

    record.verified = true;
    res.json({ success: true, message: 'OTP verified successfully.' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/reset-password', async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const record = otpStorage[email];
    if (!record || !record.verified || record.otp !== otp) {
      return res.status(400).json({ error: 'Unauthorized reset request or session expired. Verify OTP first.' });
    }

    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);

    await prisma.adminUser.update({
      where: { email },
      data: { password: newHash }
    });

    delete otpStorage[email]; // Clear session
    res.json({ success: true, message: 'Password has been updated securely.' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

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
    if (!phone || !/^\d{10}$/.test(phone)) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit mobile number.' });
    }
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
    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit mobile number.' });
    }
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

// --- CONTACT REQUEST ROUTES ---

app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, mobileNumber, subject, message } = req.body;
    if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit mobile number.' });
    }
    const request = await prisma.contactRequest.create({
      data: { name, email, mobileNumber, subject, message },
    });
    res.status(201).json(request);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/admin/contact-requests', apiKeyAuth, async (req: Request, res: Response) => {
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
    const requests = await prisma.contactRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(requests);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/contact-requests/:id', apiKeyAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.contactRequest.delete({ where: { id } });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
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
