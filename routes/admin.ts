import { Router } from 'express';
import jwtMiddleware from '../middleware/jwt';
import { GetStudents } from '../controller/admin/students';
import { GetTopics } from '../controller/admin/topics';
import { GetQuestionById, GetQuestionsFullData, GetQuestionsList, getQuestionTypes } from '../controller/admin/question_factory';

const auth = jwtMiddleware;
const adminRouter = Router();

adminRouter.get('/students', auth, GetStudents);  // Get Students

// Topics Routes
adminRouter.get('/topics', auth, GetTopics)   // Get Topics
adminRouter.get('/topics/:topic_id', auth, GetTopics) // Get Topics By ID

// Question Factory Routes
adminRouter.get('/question-types', auth, getQuestionTypes) // Get Question Types
adminRouter.get('/questions', auth, GetQuestionsList) // Get Questions List
adminRouter.get('/questions/:q_id', auth, GetQuestionById) // Get Question By ID
adminRouter.get('/get-questions-full-data', auth, GetQuestionsFullData) // Get Questions Full Data
export default adminRouter;