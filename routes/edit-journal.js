import express from 'express';
const router = express.Router();
import Journal from '../models/Journal.model.js';
import slugify from 'slugify';

router.get('/edit/:id', async (req,res) => {
    try {
        const journal = await Journal.findById(req.params.id)
        if (!journal) {
            return res.status(404).send('Journal not found');
        }
        res.render('journals/edit', { journal: journal, error : null })
        
    } catch (error) {
        console.log(error);
        res.redirect('/journals');        
    }
})

router.put('/edit/:id',async (req,res)=>{
try {
    const {title, summary, markdown} = req.body
    const journal = await Journal.findById(req.params.id);
    if (!journal) {
        return res.status(404).send('Journal not found');
    }
            journal.title = title;
            journal.summary = summary;
            journal.markdown = markdown;

            journal.updatedAt = Date.now();
            journal.slug = slugify(title, {lower : true,strict : true})
  const updatedJournal = await journal.save()

        res.redirect(`/journals/${updatedJournal.slug}`)

} catch (error) {
    console.log(error);
    res.redirect('/journals')    
}
    
}) 
export default router;

