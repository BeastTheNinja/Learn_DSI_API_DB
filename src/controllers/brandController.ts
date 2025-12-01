import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.brand.findMany({
      select: { id: true, name: true, logo: true },
      orderBy: { name: 'asc' },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch brands' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id || isNaN(id) || id <= 0) return res.status(400).json({ error: 'Invalid id' });

  try {
    const data = await prisma.brand.findUnique({ where: { id } });
    if (!data) return res.status(404).json({ error: 'Brand not found' });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch brand' });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  const { name, logo } = req.body;
  if (!name || !logo) return res.status(400).json({ error: 'Name and logo required' });

  try {
    const data = await prisma.brand.create({ data: { name, logo } });
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create brand' });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, logo } = req.body;
  if (!id || isNaN(id) || id <= 0) return res.status(400).json({ error: 'Invalid id' });
  if (!name || !logo) return res.status(400).json({ error: 'Name and logo required' });

  try {
    const data = await prisma.brand.update({ where: { id }, data: { name, logo } });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update brand' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id || isNaN(id) || id <= 0) return res.status(400).json({ error: 'Invalid id' });

  try {
    const existing = await prisma.brand.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Brand not found' });
    await prisma.brand.delete({ where: { id } });
    return res.status(200).json({ message: `Brand ${id} deleted` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete brand' });
  }
};
