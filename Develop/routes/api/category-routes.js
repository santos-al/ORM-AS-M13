const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Find all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      // Includes all products associated with each category
      include : [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

  // Find category by its ID
router.get('/:id', async (req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      // Includes any products associated with the specific category
      include: [{ model: Product}]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this ID, try again'});
      return;
    }
    res.status(200).json(categoryData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

  // Creates a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

  // Updates a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
   )
   res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

  // Deletes a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with that ID found, please try again'});
    }
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
