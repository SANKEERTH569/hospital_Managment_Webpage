import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Doctor, { IDoctor } from './models/doctorModel';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hms';

const doctors: Partial<IDoctor>[] = [
  {
    firstName: 'Maria',
    lastName: 'Rodriguez',
    email: 'dr.rodriguez@hospital.com',
    password: 'password123', // This will be hashed
    phone: '1555010100',
    specialty: 'Cardiology',
    department: 'Cardiology',
    experience: '12+ years',
    qualifications: ['MD', 'FACC'],
    isActive: true
  },
  {
    firstName: 'John',
    lastName: 'Smith',
    email: 'dr.smith@hospital.com',
    password: 'password123', // This will be hashed
    phone: '1555010200',
    specialty: 'Neurology',
    department: 'Neurology',
    experience: '15+ years',
    qualifications: ['MD', 'FAAN'],
    isActive: true
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing doctors
    await Doctor.deleteMany({});
    console.log('Cleared existing doctors');

    console.log('Creating doctors...');
    // Hash passwords and create doctors
    const createdDoctors = await Promise.all(
      doctors.map(async (doctor) => {
        console.log(`Creating doctor: ${doctor.email}`);
        try {
          const hashedPassword = await bcrypt.hash(doctor.password!, 10);
          console.log(`Hashed password for ${doctor.email}: ${hashedPassword.substring(0, 20)}...`);
          return { ...doctor, password: hashedPassword };
        } catch (hashError) {
          console.error(`Error hashing password for ${doctor.email}:`, hashError);
          throw hashError;
        }
      })
    );

    const result = await Doctor.insertMany(createdDoctors);
    console.log('Successfully created doctors:');
    result.forEach(doc => {
      console.log(`- ${doc.email} (ID: ${doc._id})`);
    });
    
    console.log(`\nYou can now log in with:`);
    console.log(`Email: dr.rodriguez@hospital.com`);
    console.log(`Password: password123\n`);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
