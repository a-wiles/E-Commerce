const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include:[{model:Product, through: ProductTag}]
  })
  .then(records => {
    console.log("GET",records)
    res.json(records)
  }).catch(err => {
    res.status(500).json(err)
  })
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include:[{model:Product, through: ProductTag}]
  })
  .then(records => {
    console.log("GET",records)
    res.json(records)
  }).catch(err => {
    res.status(500).json(err)
  })
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(records => {
    console.log("POST",records)
    res.json(records)
  }).catch(err => {
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  Tag.update(req.body,{
    where: {
      id: req.params.id
    }
  })
  .then(records => {
    console.log("Update",records)
    res.json(records)
  }).catch(err => {
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    },
  })
  .then(records => {
    console.log("DELETE",records)
    res.json(records)
  }).catch(err => {
    res.status(500).json(err)
  })
});

module.exports = router;
