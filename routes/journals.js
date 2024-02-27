import express from 'express';
const router = express.Router();
import Journal from '../models/Journal.model.js';

router.get('/', async (req,res) => {
  try {
    const userId = req.user.id;
    const journals = await Journal.find({userId : userId}).sort({ createdAt: 'desc' })
    res.render('dashboard',{ journals : journals});
  } catch (error) {
   console.log(error);
   res.render('error',{error : error}) 
  }
  })
export default router;