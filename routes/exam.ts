import { Router } from 'express';
import jwtMiddleware from '../middleware/jwt';
import { GetStudents } from '../controller/students';

const auth = jwtMiddleware;
const greTest = Router();

greTest.get('/students', auth, GetStudents);

export default greTest;