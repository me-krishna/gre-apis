import { Router } from 'express';
import jwtMiddleware from '../middleware/jwt';
import { GetStudents } from '../controller/students';

const auth = jwtMiddleware;
const adminRouter = Router();

adminRouter.get('/students', auth, GetStudents);

export default adminRouter;