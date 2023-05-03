import {
  getCategoryById,
  getCategoryByName,
  updateCategoryById,
} from '@/models/category';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { categoryId } = req.query;

  if (method !== 'PATCH' && method !== 'GET' && method === 'DELET') {
    return res.status(400).end();
  }

  if (!categoryId || typeof categoryId !== 'string') {
    throw new Error('Invalid ID');
  }

  if (method === 'PATCH') {
    const { name, parent } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }
    try {
      //   const existingCategory = await getCategoryByName(name);
      //   if (existingCategory) {
      //     return res
      //       .status(409)
      //       .json({ error: 'A Category with this name already exist' });
      //   }

      const fetchedCategory = await getCategoryById(categoryId);
      console.log(fetchedCategory);

      console.log(parent);
      if (!fetchedCategory) {
        return res
          .status(400)
          .json({ error: 'A category with this id does not exist' });
      }

      await updateCategoryById(categoryId, { name });

      return res.status(200).json({ status: 'Updated' });
    } catch (error) {
      console.log(error);
      return res.status(400).end();
    }
  }

  if (method === 'GET') {
  }

  if (method === 'DELETE') {
  }
}