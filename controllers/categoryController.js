import Category from '../models/categoryModel.js';

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = new Category({ name });
        const createdCategory = await category.save();
        res.status(201).json({
            _id: createdCategory._id,
            name: createdCategory.name,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
};

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve categories' });
    }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            res.json(category);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve category' });
    }
};

// Update a category by ID
export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        if (!category) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            res.json(category);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category' });
    }
};

// Delete a category by ID
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            res.json(category);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
};
