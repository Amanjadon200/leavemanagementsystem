import express from 'express';
const leaveRouter = express.Router();
import { getAllLeaves, createLeave, updateLeave } from './leave.controller.js';

// Leave routes
leaveRouter.get('/getallleaves', getAllLeaves);
leaveRouter.post('/createleave', createLeave);
leaveRouter.put('/updateleave/:id', updateLeave);


export default leaveRouter;
