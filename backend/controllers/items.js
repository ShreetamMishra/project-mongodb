import Item from "../model/Item.js";
import path from "path";
import asyncWrapper from "../middleware/asyncWrapper.js";

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({ items });
  } catch (error) {
    console.log(error);
  }
};

export const addItem = asyncWrapper(async (req, res) => {
  const { name } = req.body;
  const file = req.file.path;
  const item = await Item.create({ name, file });
  res.status(201).json({ item });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const downloadFile = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);
  if (!item) {
    return res.status(404).json({ error: "No item found" });
  }
  const file = item.file;
  const filePath = join(__dirname, '..', file);
  res.download(filePath);
});