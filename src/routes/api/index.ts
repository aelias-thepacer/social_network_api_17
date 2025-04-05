import { Router } from 'express';
import { userRouter } from './userRoutes.js';
import { thoughtRouter } from './thoughtRoutes.js';

const router = Router();

router.use('/user', userRouter);
router.use('/thoughts', thoughtRouter);

export default router;
