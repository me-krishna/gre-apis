import { Router } from 'express';
import jwtMiddleware from '../middleware/jwt';
import { generateExamSection, getListOfexams } from '../controller/student/exams';
import Login from '../controller/auth/login';
import { getExamSectionFullDetails, getQuestionsDataBySections, getSectionsByExamIDStudent } from '../controller/student/sections';

const auth = jwtMiddleware;
const students = Router();

students.post("/login", Login);
students.get('/exams', auth, getListOfexams);
students.get('/getExamSections', auth, getSectionsByExamIDStudent);
students.post('/generateExamSection', auth, generateExamSection);
students.post('/getQuestionsDataBySections', auth, getQuestionsDataBySections);
students.post('/getSectionFullDetails', auth, getExamSectionFullDetails);


export default students;