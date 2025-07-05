import { Request, Response } from 'express';
import Doctor, { IDoctor } from '../models/doctorModel';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config(); // Load environment variables

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

const JWT_SECRET = process.env.JWT_SECRET;

// Register a new doctor
export const registerDoctor = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, phone, specialty, department, experience, qualifications } = req.body;

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor with this email already exists' });
    }

    // Create new doctor
    const doctor = new Doctor({
      firstName,
      lastName,
      email,
      password,
      phone,
      specialty,
      department,
      experience,
      qualifications: qualifications || []
    });

    await doctor.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: doctor._id, email: doctor.email, role: 'doctor' },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return doctor data without password
    const { password: _, ...doctorData } = doctor.toObject();

    res.status(201).json({
      message: 'Doctor registered successfully',
      token,
      doctor: doctorData
    });
  } catch (error: any) {
    console.error('Error registering doctor:', error);
    res.status(500).json({ message: 'Error registering doctor', error: error.message });
  }
};

// Doctor login
export const loginDoctor = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find doctor by email
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if account is active
    if (!doctor.isActive) {
      return res.status(403).json({ message: 'Account is deactivated' });
    }

    // Check password
    const isMatch = await (doctor as any).comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: doctor._id, email: doctor.email, role: 'doctor' },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return doctor data without password
    const { password: _, ...doctorData } = doctor.toObject();

    res.json({
      message: 'Login successful',
      token,
      doctor: doctorData
    });
  } catch (error: any) {
    console.error('Error logging in doctor:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Get current doctor's profile
export const getCurrentDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findById(req.user?.id).select('-password');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error: any) {
    console.error('Error fetching doctor profile:', error);
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

// Update doctor profile
export const updateDoctor = async (req: Request, res: Response) => {
  try {
    const updates = { ...req.body };
    delete updates.password; // Prevent password update here

    const doctor = await Doctor.findByIdAndUpdate(
      req.user?.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ message: 'Profile updated successfully', doctor });
  } catch (error: any) {
    console.error('Error updating doctor profile:', error);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

// Get all doctors (for admin)
export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find({}).select('-password');
    res.json(doctors);
  } catch (error: any) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Error fetching doctors', error: error.message });
  }
};

// Delete doctor (admin only)
export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ message: 'Error deleting doctor', error: error.message });
  }
};
