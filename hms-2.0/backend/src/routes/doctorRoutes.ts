import express from 'express';
import {
  registerDoctor,
  loginDoctor,
  getCurrentDoctor,
  updateDoctor,
  getAllDoctors,
  deleteDoctor
} from '../controllers/doctorController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', registerDoctor);
router.post('/login', loginDoctor);

// Protected routes (require authentication)
router.use(authenticate);

// Doctor routes
router.get('/me', getCurrentDoctor);
router.put('/me', updateDoctor);

// Admin routes
router.use(authorize(['admin']));
router.get('/', getAllDoctors);
router.delete('/:id', deleteDoctor);

export default router;
