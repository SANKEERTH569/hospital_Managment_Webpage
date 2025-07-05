import { Request, Response } from 'express';
import { Appointment, IAppointment } from '../models/Appointments';

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { patientName, email, phone, department, doctor, date, time, reason } = req.body;
    
    // Convert date string to Date object
    const appointmentDate = new Date(date);
    
    const appointment = new Appointment({
      patientName,
      email,
      phone,
      department,
      doctor,
      date: appointmentDate,
      time,
      reason,
      status: 'pending'
    });

    await appointment.save();
    
    res.status(201).json({
      success: true,
      data: appointment,
      message: 'Appointment booked successfully!'
    });
  } catch (error: any) {
    console.error('Error creating appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to book appointment',
      error: error?.message || 'An unknown error occurred'
    });
  }
};

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const { doctor, status, startDate, endDate } = req.query;
    
    const filter: any = {};
    
    if (doctor) {
      filter.doctor = doctor;
    }
    
    if (status) {
      // Handle comma-separated statuses
      if (typeof status === 'string' && status.includes(',')) {
        filter.status = { $in: status.split(',') };
      } else {
        filter.status = status;
      }
    }
    
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      };
    }
    
    console.log('Fetching appointments with filter:', JSON.stringify(filter, null, 2));
    
    // Log the doctor ID being used for the query
    if (filter.doctor) {
      console.log(`Looking for appointments for doctor ID: ${filter.doctor}`);
      
      // Check if any appointments exist for this doctor
      const doctorAppointments = await Appointment.find({ doctor: filter.doctor }).lean();
      console.log(`Found ${doctorAppointments.length} appointments for doctor ${filter.doctor}`);
      
      if (doctorAppointments.length > 0) {
        console.log('Sample appointment data:', JSON.stringify(doctorAppointments[0], null, 2));
      }
    }
    
    const appointments = await Appointment.find(filter)
      .sort({ date: 1, time: 1 })
      .lean(); // Convert to plain JavaScript objects
    
    // Log the raw appointments from the database
    console.log(`Found ${appointments.length} appointments matching the query`);
    if (appointments.length > 0) {
      console.log('Sample appointment data from query:', JSON.stringify(appointments[0], null, 2));
    }
    
    // Transform the data to match the frontend's expected format
    const transformedAppointments = appointments.map(appt => ({
      ...appt,
      _id: appt._id.toString(),
      date: appt.date ? new Date(appt.date).toISOString() : null,
      createdAt: appt.createdAt ? new Date(appt.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: appt.updatedAt ? new Date(appt.updatedAt).toISOString() : new Date().toISOString()
    }));
    
    res.status(200).json({
      success: true,
      count: transformedAppointments.length,
      data: transformedAppointments
    });
  } catch (error: any) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments',
      error: error?.message || 'An unknown error occurred'
    });
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: appointment,
      message: 'Appointment status updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update appointment status',
      error: error?.message || 'An unknown error occurred'
    });
  }
};
