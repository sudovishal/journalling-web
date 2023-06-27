const router = require('express').Router();
const Journal = require('../models/journal')

router.delete('/:id', async (req, res) => {
    await Journal.findByIdAndDelete(req.params.id)
    res.redirect('/journals')
})
module.exports = router;