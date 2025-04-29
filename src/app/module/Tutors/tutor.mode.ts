import { model, Schema } from 'mongoose';
import { ITutor } from './turtor.interface';

export const educationSchema = new Schema({
  exam: {
    type: String,
    required: [true, 'Exam is required'],
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
  },
  institution: {
    type: String,
    required: [true, 'Institution is required'],
  },
  grade: {
    type: Number,
    required: [true, 'Grade is required'],
  },
  outOf: {
    type: Number,
    required: [true, 'Out of is required'],
  },
});
export const credentialsSchema = new Schema({
  documentType: { 
    type: String,
    enum: ['Certificate', 'ID Card', 'Transcript', 'Other'],
    required: [true, 'Document type is required'],
  },
  documentUrl: {    
    type: String,
    required: [true, 'Document URL is required'],
  },
});
export const tutorOffersSchema = new Schema({
  class: {  
    type: String,
    required: [true, 'Class is required'],
    },
    subject: {
        type: [String],
        required: [true, 'Subject is required'],
    },
    days: {
        type: Number,
        required: [true, 'Days are required'],
    },
    hours: {
        type: Number,
        required: [true, 'Hours are required'],
    },
    expectedSalary: {
        type: Number,
        required: [true, 'Expected salary is required'],
    },
    curriculam: {
        type: String,
        required: [true, 'Curriculam is required'],
    },
});



export const tutorSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  education: {
    type: [educationSchema],
    required: [true, 'Education is required'],
  },
  skills: {
    type: [String],
    required: [true, 'Skills are required'],
  },
  experience: {
    type: [String],
    required: [true, 'Experience is required'],
  },
    profilePicture: {
        type: String,
        required: [true, 'Profile picture is required'],
    },
    credentials: {
        type: credentialsSchema,
        required: [true, 'Credentials are required'],
    },
    expectedHonorarium: {
        type: [tutorOffersSchema],
        required: [true, 'Expected honorarium is required'],
    },
    additionalInfo: {   
        type: String,
       
    }
},{timestamps: true});

export const TutorModel = model<ITutor>('Tutor', tutorSchema);
