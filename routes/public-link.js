const router = require('express').Router();
const { model } = require('mongoose');
const Journal = require('../models/Journal.model')
router.post('/journals/:slug/visibility', async (req, res) => {
    try {
        const slug = req.params.slug;
        const isPublic = req.body.isPublic === 'on'; // Check if the checkbox is checked
        const journal = await Journal.findOne({slug : slug});
      if (!journal) {
        res.status(404).send('Journal not found');
      }  else {
         // Update the visibility of the journal
         journal.isPublic = isPublic;
         await journal.save();
         res.redirect('/journals'); 
        } 
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
    });
module.exports = router