import express from 'express';
import { 
  createAppointment, 
  getAppointments, 
  updateAppointmentStatus 
} from '../controllers/appointmentController';

const router = express.Router();

// Create a new appointment
router.post('/', createAppointment);

// Get all appointments (with optional query params)
router.get('/', getAppointments);

// Update appointment status
router.patch('/:id/status', updateAppointmentStatus);

export default router;