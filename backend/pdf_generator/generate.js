const { createPDF } = require('./pdfGenerator');

const sampleData = {
  // Application Details
  ApplicationID: "2425SJS1004195535",
  SchemeName: "Government of India Post-Matric Scholarship",
  DepartmentName: "Social Justice and Special Assistance Department",
  AppliedDate: "23/04/2025",

  // Personal Details
  ApplicantFullName: "Rahul Arvind Parakh",
  MobileNumber: "9876543210",
  EmailID: "test@example.com",
  DOB: "01/01/2000",
  Gender: "Male",
  Religion: "Hindu",
  MaritalStatus: "Unmarried",

  // Permanent Address
  Address: "At Post Deoli, Taluka Chalisgaon",
  PermanentState: "Maharashtra",
  PermanentDistrict: "Jalgaon",
  PermanentTaluka: "Chalisgaon",
  PermanentVillage: "Deoli",
  PermanentPincode: "424116",

  // Correspondence Address
  CorrespondenceAddress: "B3 Rugved Apartment, Vishrambag, Sangli",
  CorrespondenceState: "Maharashtra",
  CorrespondenceDistrict: "Sangli",
  CorrespondenceTaluka: "Miraj",
  CorrespondenceVillage: "Vishrambag",
  CorrespondencePincode: "416415",

  // Income Details
  AnnualIncome: "45000.00",
  IncomeCertificateNo: "6033002746354",
  IssuingAuthorityIncome: "Tahsildar",
  IssueDateIncomeCertificate: "08/08/2024",

  // Domicile Details
  DomicileCertificateNo: "58183306120010981",
  IssuingAuthorityDomicile: "Executive Magistrate",
  IssueDateDomicileCertificate: "24/06/2013",

  // Caste Details
  CasteCategory: "(SC) Scheduled Caste",
  CasteCertificateNo: "7890",
  IssuingDistrictCasteCertificate: "Nandurbar",
  IssuingAuthorityCaste: "Sub Divisional Officer (SDO)",

  // Parent/Guardian Details
  FatherName: "Arvind Parakh",
  MotherName: "Prabhavati Parakh",

  // Past Qualification Details
  BoardUniversity10: "MAHARASHTRA STATE BOARD OF SECONDARY AND HIGHER SECONDARY EDUCATION",
  PassingYear10: "2021",
  Percentage10: "84.00",
  BoardUniversity12: "MAHARASHTRA STATE BOARD OF SECONDARY AND HIGHER SECONDARY EDUCATION",
  PassingYear12: "2023",
  Percentage12: "84.00",

  // Current Course Details
  CourseNameCurrent: "Bachelor of Engineering (B.E.) - Computer Science and Engineering",
  InstituteNameCurrent: "Walchand College of Engineering, Sangli",
  AdmissionYearCurrent: "2024",
  CAPIDCurrent: "E2489765",

  // Hostel Details
  HostelName: "Shree Niwas House",
  hostel_type: "Rented House",
  RentPerMonth: "3000.00",

  // Fee Details
  TutionFee: "81818.00",
  DevelopmentFee: "8182.00",
  ExamFee: "2000.00",

  // Scholarship Benefits
  MaintenanceAllowancePerMonth: "1350.00",
  TotalMaintenanceAllowance: "13500.00",
};

createPDF(sampleData);
