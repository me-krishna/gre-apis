import { Router } from 'express';
import jwtMiddleware from '../middleware/jwt';
import { getListOfexams } from '../controller/student/exams';

const auth = jwtMiddleware;
const students = Router();

students.get('/exams', auth, getListOfexams);

export default students;