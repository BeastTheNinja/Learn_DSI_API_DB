import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.car.findMany({
      select: {
        id: true,
        model: true,
        price: true,
        brand: { select: { id: true, name: true, logo: true } },
        category: { select: { id: true, name: true } },
      },
      orderBy: { price: 'desc' },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id || isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'Id is missing or invalid' });
  }

  try {
    const data = await prisma.car.findUnique({
      where: { id },
      include: { brand: true, category: true },
    });
    if (!data) return res.status(404).json({ error: 'Car not found' });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch car' });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  const { categoryId, brandId, model, year, price, fuelType } = req.body;
 // console.log(req.body);
  if (
    !categoryId ||
    !brandId ||
    !model ||
    !year ||
    !price ||
    !fuelType
  ) {
    return res.status(400).json({ error: 'All data is required' });
  }

  try {
    const data = await prisma.car.create({
      data: {
        categoryId: Number(categoryId),
        brandId: Number(brandId),
        model,
        year: Number(year),
        price: Number(price),
        fuelTypeId: Number(fuelType),
      },
    });
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id || isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'Id is missing or invalid' });
  }

  const { categoryId, brandId, model, year, price, fuelType } = req.body;

  if (
    !categoryId ||
    !brandId ||
    !model ||
    year === undefined ||
    price === undefined ||
    !fuelType
  ) {
    return res.status(400).json({ error: 'All data is required' });
  }

  try {
    const data = await prisma.car.update({
      where: { id },
      data: {
        categoryId: Number(categoryId),
        brandId: Number(brandId),
        model,
        year: Number(year),
        price: Number(price),
        fuelType,
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id || isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'Id is missing or invalid' });
  }

  try {
    const existing = await prisma.car.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Car not found' });

    await prisma.car.delete({ where: { id } });
    return res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete car' });
  }
};