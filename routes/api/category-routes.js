const router = require('express').Router();
const { Category, Product } = require('../../models');
const { findAll } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include:[Product]
  })
  .then(records => {
    console.log("GET",records)
    res.json(records)
  }).catch(err => {
    res.status(500).json(err)
  })
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    include:[Product]
  })
  .then(records => {
    console.log("GET",records)
    res.json(records)
  }).catch(err => {
    res.status(500).json(err)
  })
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(records => {
    console.log("POST",records)
    res.json(records)
  }).catch(err => {
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value  update employee set roles=12,emp="newname" where id=1
  Category.update(req.body,{
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
  // delete a category by its `id` value
  Category.destroy({
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
