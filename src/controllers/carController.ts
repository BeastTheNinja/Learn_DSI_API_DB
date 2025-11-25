import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.cars.findMany({
      select: {
        id: true,
        brand: true,
        model: true,
        price: true,
      },
      orderBy: {
        price: 'desc',
      },
    });
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
  const id = Number(req.params.id);

  if (!id || isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'Id skal have en gyldig værdi' });
  }

  const { category, brand, model, year, price, fuelType } = req.body;

  if (
    !category ||
    !brand ||
    !model ||
    year === undefined ||
    year === null ||
    price === undefined ||
    price === null ||
    !fuelType
  ) {
    return res.status(400).json({ error: 'Alle felter skal udfyldes' });
  }

  try {
    const data = await prisma.cars.update({
      where: { id },
      data: {
        category,
        brand,
        model,
        year: Number(year),
        price: Number(price),
        fuelType,
      },
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update car' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id || isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'Id skal have en gyldig værdi' });
  }

  try {
    const existing = await prisma.cars.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Car not found' });

    await prisma.cars.delete({ where: { id } });
    return res.status(200).json({ message: `Car ${id} deleted` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete car' });
  }
};
