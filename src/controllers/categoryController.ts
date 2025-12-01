import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'desc' },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id || isNaN(id) || id <= 0) return res.status(400).json({ error: 'Invalid id' });

  try {
    const data = await prisma.category.findUnique({ where: { id } });
    if (!data) return res.status(404).json({ error: 'Category not found' });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });

  try {
    const data = await prisma.category.create({ data: { name } });
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create category' });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  if (!id || isNaN(id) || id <= 0) return res.status(400).json({ error: 'Invalid id' });
  if (!name) return res.status(400).json({ error: 'Name required' });

  try {
    const data = await prisma.category.update({ where: { id }, data: { name } });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update category' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id || isNaN(id) || id <= 0) return res.status(400).json({ error: 'Invalid id' });

  try {
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Category not found' });
    await prisma.category.delete({ where: { id } });
    return res.status(200).json({ message: `Category ${id} deleted` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete category' });
  }
};
