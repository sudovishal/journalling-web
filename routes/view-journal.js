const router = require('express').Router();
const Journal = require('../models/journal')

// Route for viewing a journal entry
router.get('/:slug', async (req, res) => {
    try {
      // Find the journal entry by its ID
      const journal = await Journal.findOne({slug : req.params.slug});
  if (journal == null) res.redirect('/')
      // Render the view template and pass the journal data
      res.render('journals/show', { journal });
    } catch (error) {
      console.log(error);
      res.redirect('/journals');
    }
  });
  module.exports = router;