const express = require('express')
const router = express.Router();

// Item MODEL
const Item = require('../../models/Item')

// @route GET api/items
// @desc Get all items
// @access Public
router.get('/', async (req, res) =>
{
    let items = await Item.find().sort({
        date: -1//descending
    })
    res.json(items)

})

// @route POST api/items
// @desc Create an item
// @access Public
router.post('/', async (req, res) =>
{
    const newItem = new Item(
        {
            name: req.body.name
        }
    )

    let item = await newItem.save()
    res.json(item)
})

// @route DELETE api/items/:id
// @desc Delete an item
// @access Public
router.delete('/:id', async (req, res) =>
{
    let item = await Item.findById(req.params.id)
    if (item)
    {
        await item.remove()
        res.json({
            success: true
        })
    }
    else
    {
        res.status(404).json({
            success: false
        })
    }

})

module.exports = router