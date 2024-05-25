import { Router } from 'express';
import jwtMiddleware from '../middleware/jwt';
import { generateExamSection, getListExamQuestions, getListOfexams } from '../controller/student/exams';
import Login from '../controller/auth/login';
import { getExamQuestion, getExamSectionFullDetails, getListOfQuestionDataBasedOnQuestionId, getQuestionsDataBySections, getSectionsByExamIDStudent, updateExamSectionData, updateExamSectionQuestionData } from '../controller/student/sections';

const auth = jwtMiddleware;
const students = Router();

students.post("/login", Login);
students.get('/exams', auth, getListOfexams);
students.get('/getExamSections', auth, getSectionsByExamIDStudent);
students.post('/generateExamSection', auth, generateExamSection);
students.post('/getQuestionsDataBySections', auth, getQuestionsDataBySections);
students.post('/getSectionFullDetails', auth, getExamSectionFullDetails);
students.post('/getExamQuestion', auth, getExamQuestion);
students.post('/updateExamSection', auth, updateExamSectionData);
students.post('/updateExamQuestionSection', auth, updateExamSectionQuestionData);
students.post('/getListExamQuestions', auth, getListExamQuestions);
students.post('/getListExamQuestionDataBasedOnQSections', auth, getListOfQuestionDataBasedOnQuestionId);


export default students;