export interface IResult {
  exam: string; // SSC, HSC, Bachelor, Masters
  year: number;
  institution: string;
  grade: number;
  outOf: number;
}


//~They will be added later on
// export interface IReview {
//   reviewerName: string;
//   comment: string;
//   rating: number;
//   date: string; // or Date object
// }

export interface ICredentials {
  documenType: 'Certificate' | 'ID Card' | 'Transcript' | 'Other';
  documentUrl: string;
}

export interface ITutorOffers {
  class: string; // preffered input is class 1 t0 5 or 6 to 10 or 11 to 12
  subject: string[]; // mention the subject name
  days: number; // number of days in a week
  hours: number; // number of hours in a day
  expectedSalary: number; // expected salary 
  curriculam: string; // curriculam name
}



export interface ITutor {
  name: string;
  contactNumber: string;
  email: string;
  education: IResult[]; // Array because one tutor can have multiple degrees
  skills: string[];
  experience: string[];
  profilePicture: string;
  credentials: ICredentials[]; // Array because one tutor can have multiple credentials
  // rating?: number;
  // reviews?: IReview[]; //!reviews and ratings will grow over time so it will require an another model to store them
  expectedHonorarium: ITutorOffers[]; // Array because one tutor can have multiple salary expectations
  additionalInfo?: string;

}
