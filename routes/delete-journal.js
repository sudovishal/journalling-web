import express from 'express';
import Journal from '../models/Journal.model.js';
const router = express.Router();
router.delete('/:id', async (req, res) => {
    try {
    await Journal.findByIdAndDelete(req.params.id)
    res.status(200).send();
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})
export default router;
