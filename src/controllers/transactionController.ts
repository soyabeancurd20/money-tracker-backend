import { Request, Response, NextFunction } from 'express';
import Transaction from '../models/Transaction';
export const getTransactions = async (_req: Request, res: Response, next: NextFunction) => {
  try { const tx = await Transaction.find({}).sort({ date:-1 }).lean(); res.json(tx); } catch (err) { next(err); }
};
export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, category, amount, date, note } = req.body;
    const tx = await Transaction.create({ type, category, amount, date: date? new Date(date): new Date(), note });
    res.status(201).json(tx);
  } catch (err) { next(err); }
};
export const updateTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try { const id = req.params.id; const updated = await Transaction.findByIdAndUpdate(id, { $set: req.body }, { new: true }).lean();
    if(!updated) return res.status(404).json({ message: 'Transaction not found' }); res.json(updated);
  } catch (err) { next(err); }
};
export const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try { const id = req.params.id; const removed = await Transaction.findByIdAndDelete(id).lean(); if(!removed) return res.status(404).json({ message:'Transaction not found' }); res.json({ message:'Deleted' }); }
  catch (err) { next(err); }
};
