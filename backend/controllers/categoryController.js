import asyncHandler from "express-async-handler";
import Category from '../models/categoryModel.js';

const addCategory = asyncHandler(async (req, res) => {
   
    const category = new Category({
        categoryName: req.body.categoryName,
        title: req.body.title,
        priority: req.body.priority,
    })
    const createdCategory = await category.save()
    res.status(200).json(createdCategory);
})

const updateCategory = asyncHandler(async (req, res) => {
    const {
        categoryName,
        title,
        priority
    } = req.body;

    const category = await Category.findById(req.params.id)

    if (category) {
        category.categoryName = categoryName;
        category.title = title;
        category.priority = priority;

        const updateCategory = await category.save()
        res.json(updateCategory);
    }
    else {
        res.status(404)
        throw new Error('Category not found')
    }
})

const getCategories = asyncHandler(async (req, res) => {
  

    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
  
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}
  
    const count = await Category.countDocuments({ ...keyword })
    const categories = await Category.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
  
    res.json({ categories, page, pages: Math.ceil(count / pageSize) })
})

const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)
  
    if (category) {
      res.json(category)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
})
  
const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)
  
    if (category) {
      await category.remove()
      res.json({ message: 'Category removed' })
    } else {
      res.status(404)
      throw new Error('Category not found')
    }
  })

export {
    addCategory,
    updateCategory,
    getCategories,
    getCategoryById,
    deleteCategory,
}

