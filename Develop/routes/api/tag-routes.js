const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      // Includes associated Product data
      include: [
        {
          model: Product,
          through: ProductTag,
        }
      ]
    });
    res.status(200).json(tagData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

  // find a single tag by its `id`
router.get('/:id', async (req, res) => {
    /* req.body should look like this...
    {
      tag_name: "yellow"
    }
  */
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      // Includes associated Product data
      include: [
        {
          model: Product,
          through: ProductTag,
        }
      ]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this ID, try again'});
      return;
    }
    res.status(200).json(tagData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

  // create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

  // update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
   )
   res.status(200).json("Successfully Updated");
  }
  catch (err) {
    res.status(500).json(err);
  }
});

  // delete a tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with that ID found, please try again'});
      return;
    }
    res.status(200).json("Successfully Deleted");
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
