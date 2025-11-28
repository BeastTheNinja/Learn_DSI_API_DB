import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

/**
 * Method Get Records
 * @param req 
 * @param res 
 * @returns Array
 */
export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.car.findMany();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
};

/**
 * Method Get Record
 * @param req 
 * @param res 
 * @returns Object
 */
export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if(!id) {
    return res.status(400).json({ error: 'Id is missing '})
  }

  try {
    const data = await prisma.car.findUnique({
      where: { id },
      select: {
        id: true,
        model: true,
        brand: true
      }
    })
    return res.status(200).json(data)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch car' });
  }
}

/**
 * Method Create Record
 * @param req 
 * @param res 
 * @returns Object
 */
export const createRecord = async (req: Request, res: Response) => {

  const { category, brand, model, year, price, fueltype } = req.body;
  
  if(!category || !brand || !model || !year || !price || !fueltype) {
    return res.status(400).json({ error: 'All data is required' })
  }
  
  try {
    const data = await prisma.car.create({
      data: {
        category,
        brand,
        model,
        year: Number(year),
        price,
        fueltype
      }
    })
    return res.status(201).json(data)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' }) 
  }
}


export const updateRecord = async (req: Request, res: Response) => {

  const { category, brand, model, year, price, fueltype } = req.body;
  
  if(!category || !brand || !model || !year || !price || !fueltype) {
    return res.status(400).json({ error: 'All data is required' })
  }
  
  try {
    const data = await prisma.car.create({
      data: {
        category,
        brand,
        model,
        year: Number(year),
        price,
        fueltype
      }
    })
    return res.status(201).json(data)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' }) 
  }
}