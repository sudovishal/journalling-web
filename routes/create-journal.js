const router = require('express').Router();
const Journal = require('../models/journal')

router.get('/',(req,res) => {
    res.render('journals/new',{error : null});
})

router.post('/', async (req,res) => {
    const {title, summary, markdown } = req.body;
    try {
        let journal = new Journal({
            title,
            summary,
            markdown,
            createdAt: new Date(), // Set the createdAt timestamp to the current date and time
            userId : req.user.id
        })
        const savedJournal = await journal.save();
        console.log(savedJournal);
        console.log(req.user.id);
        journal = await Journal.findById(savedJournal._id).populate('userId');
        console.log(journal.userId.email); // Output the username of the user who created the journal entry
        res.redirect('/journals');
    } catch (error) {
         // Handle any errors that occurred during journal creation
        console.log(error);
         res.render('journals/new',{ error : 'Failed to create a journal entry'})
    }
})
module.exports = router;