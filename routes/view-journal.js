const router = require('express').Router();
const Journal = require('../models/journal')

// Route for viewing a journal entry
router.get('/:slug', async (req, res) => {
    try {
      // Find the journal entry by its ID
      const journal = await Journal.findOne({slug : req.params.slug});
      if (journal == null) res.redirect('/')
      // Render the view template and pass the journal data
      if (journal.isPublic) {
        // If the journal is public, it can be accessed by everyone.
        if (req.user) {
            // User is logged in, render the show.ejs template.
            res.render('journals/show', { journal });
        } else {
            // User is not logged in, but the journal is public, render the show-public.ejs template.
            res.render('public-show', { journal });
        }
    } else {
        // If the journal is not public, only logged-in users can access it.
        if (req.user) {
            // User is logged in, render the show.ejs template.
            res.render('journals/show', { journal });
        } else {
            // User is not logged in, and the journal is not public. Handle this case as needed.
            return res.status(403).send('Access denied'); // You can customize this message and status code.
        }
    }
    } catch (error) {
      console.log(error);
      res.redirect('/journals');
    }
  });
  module.exports = router;