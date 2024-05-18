import { Router } from 'express';
import jwtMiddleware from '../middleware/jwt';
import { generateExamSection, getListOfexams } from '../controller/student/exams';
import Login from '../controller/auth/login';
import { getSectionsByExamIDStudent } from '../controller/student/sections';

const auth = jwtMiddleware;
const students = Router();

students.post("/login", Login);
students.get('/exams', auth, getListOfexams);
students.get('/getExamSections', auth, getSectionsByExamIDStudent);
students.post('/generateExamSection', auth, generateExamSection);
export default students;