const router = require('express').Router();
const Journal = require('../models/journal')

router.delete('/:id', async (req, res) => {
    try {
    await Journal.findByIdAndDelete(req.params.id)
    res.status(200).send();
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})
module.exports = router;