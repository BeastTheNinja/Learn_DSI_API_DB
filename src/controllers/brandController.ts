import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.brands.findMany();
    console.log('brandController:getRecords');
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch brands' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await prisma.brands.findUnique({ where: { id } });
    if (!data) return res.status(404).json({ error: 'Brand not found' });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch brand' });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const data = await prisma.brands.create({ data: payload });
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create brand' });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const payload = req.body;
    const data = await prisma.brands.update({ where: { id }, data: payload });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update brand' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.brands.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete brand' });
  }
};
