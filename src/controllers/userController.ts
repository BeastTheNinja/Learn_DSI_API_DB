import { Request, Response } from 'express';
import { prisma } from '../prisma.js';
import brypt from 'bcrypt';
import { Prisma } from '@prisma/client';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        role: true,
        isActive: true,
      },
      orderBy: { id: 'asc' },
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id || isNaN(id) || id <= 0) return res.status(400).json({ error: 'Invalid id' });

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, firstname: true, lastname: true, email: true, role: true, isActive: true },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password, role, isActive } = req.body;
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hashed = await brypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashed,
        role,
        isActive: Boolean(isActive),
      },
      select: { id: true, firstname: true, lastname: true, email: true, role: true, isActive: true },
    });
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already in use' });
    }
    return res.status(500).json({ error: 'Failed to create user' });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id || isNaN(id) || id <= 0) return res.status(400).json({ error: 'Invalid id' });

  const { firstname, lastname, email, password, role, isActive } = req.body;
  const data: any = {};
  if (firstname) data.firstname = firstname;
  if (lastname) data.lastname = lastname;
  if (email) data.email = email;
  if (role) data.role = role;
  if (isActive !== undefined) data.isActive = Boolean(isActive);
  if (password) data.password = await brypt.hash(password, 10);

  try {
    const updated = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, firstname: true, lastname: true, email: true, role: true, isActive: true },
    });
    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already in use' });
    }
    return res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id || isNaN(id) || id <= 0) return res.status(400).json({ error: 'Invalid id' });

  try {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'User not found' });
    await prisma.user.delete({ where: { id } });
    return res.status(200).json({ message: `User ${id} deleted` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete user' });
  }
};