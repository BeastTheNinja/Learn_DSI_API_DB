import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.cars.findMany();
    console.log('carController:getRecords');
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await prisma.cars.findUnique({ where: { id } });
    if (!data) return res.status(404).json({ error: 'Car not found' });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch car' });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const data = await prisma.cars.create({ data: payload });
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create car' });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const payload = req.body;
    const data = await prisma.cars.update({ where: { id }, data: payload });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update car' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.cars.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete car' });
  }
};
