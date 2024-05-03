import { Router } from 'express';
import jwtMiddleware from '../middleware/jwt';
import { GetStudents } from '../controller/admin/students';
import { GetTopics } from '../controller/admin/topics';
import { GetQuestionById, GetQuestionsFullData, GetQuestionsList, getQuestionTypes } from '../controller/admin/question_factory';
import { createExam, deleteTheExam, getAllExams, getExamById, getSectionsByExamID, updateExam, updateMultipleSectins, updateSectionIdByUuid } from '../controller/admin/exams';
import { uploadExamImage } from '../controller/admin/utils';
import upload from '../utils/upload-config';
import { createPracticeTest, getAllTests, getTestByUuid, updatePracticeTest, updatePracticeTestDeleteStatus } from '../controller/admin/practice_test';

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

// Exam Routes
adminRouter.post('/exam', auth, createExam) // Create Exam (POST)
adminRouter.get('/exam', auth, getAllExams) // Get All Exams (GET)
adminRouter.get('/exam/:exam_id', auth, getExamById) // Get Exam By ID (GET)
adminRouter.put('/exam/:exam_id', auth, updateExam) // Get Exam By ID (GET)
adminRouter.patch('/exam/:exam_id', auth, deleteTheExam) // Update Exam (PUT)


//Exam Sections
adminRouter.get('/sections/:exam_id', auth, getSectionsByExamID)
adminRouter.patch('/sections/:section_id', auth, updateSectionIdByUuid)
adminRouter.put('/sections-update/', auth, updateMultipleSectins)

// Mock Tests
adminRouter.post("/mock-test", auth, createPracticeTest) // Create Mock Test
adminRouter.put("/mock-test/:testId", auth, updatePracticeTest) // Create Mock Test
adminRouter.get('/mock-test', auth, getAllTests) // Get All Mock Tests (GET)
adminRouter.post('/getTestByUuid', auth, getTestByUuid) // Get Mock Test By ID (GET)
adminRouter.post('/delete-test', auth, updatePracticeTestDeleteStatus) // Get Mock Test By ID (GET)

// Geniric Routes
// upload.single('upload')
adminRouter.post('/single-upload', auth, upload.single('upload'), uploadExamImage)


export default adminRouter;