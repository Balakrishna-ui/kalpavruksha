import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// --- MEMBERSHIP ROUTES ---

app.post('/api/membership', async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, location, district, membershipType } = req.body;
    const member = await prisma.member.create({
      data: { fullName, email, phone, location, district, membershipType },
    });
    res.status(201).json(member);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/membership', async (_req: Request, res: Response) => {
  const members = await prisma.member.findMany();
  res.json(members);
});

// --- PRODUCT ROUTES ---

app.get('/api/products', async (req: Request, res: Response) => {
  const { category } = req.query;
  const where = category ? { category: String(category) } : {};
  const products = await prisma.product.findMany({ where });
  res.json(products);
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

app.post('/api/projects', async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.create({ data: req.body });
    res.status(201).json(project);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Kalpavruksha API is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
