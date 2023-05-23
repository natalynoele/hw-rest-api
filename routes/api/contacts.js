const express = require('express')

const router = express.Router()

const { getAll, add, getById, removeById, updateById } = require("../../controllers")

router.get("/", getAll);

router.get('/:id', getById)

router.post('/', add)

router.delete('/:id', removeById)

router.put('/:id', updateById)

module.exports = router
