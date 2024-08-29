const { Sequelize } = require("sequelize");
const sequelize = require("../database/connection");
const ROLES = require("../helpers/roles");

const dummyModel = sequelize.define("dummy_profiles", {
  id: {
    type: Sequelize.Sequelize.DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  candidateName: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
    field: 'Candidate_name',
  },
  gender: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
  },
  dob: {
    type: Sequelize.DataTypes.DATE,
    allowNull: true,
  },
  alternateMobileNumber: {
    type: Sequelize.DataTypes.STRING(15),
    allowNull: true,
    field: 'alternate_mobile_number',
  },
  whatsappNumber: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
    field: 'whatsapp_number',
  },
  parentMobileNumber: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
    field: 'parent_mobile_number',
  },
  maritalStatus: {
    type: Sequelize.DataTypes.STRING(20),
    allowNull: true,
    field: 'marital_status',
  },
  religion: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
  },
  casteCategory: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'CasteCategory',
  },
  subCaste: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'SubCaste',
  },
  doYouHaveCasteCertificate: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'do_you_have_caste_certificate',
  },
  casteCertificateNumber: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: true,
    field: 'caste_certificate_number',
  },
  casteIssuedDistrict: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'caste_issued_district',
  },
  casteApplicantName: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'caste_applicantName',
  },
  casteIssuingAuthority: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'caste_Iss_Authority',
  },
  casteDoc: {
    type: Sequelize.DataTypes.STRING(255),
    allowNull: true,
    field: 'caste_doc',
  },
  casteIssuedDate: {
    type: Sequelize.DataTypes.DATE,
    allowNull: true,
    field: 'caste_issued_date',
  },
  annualFamilyIncome: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: true,
    field: 'annual_family_income',
  },
  doYouHaveIncomeCertificate: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'do_you_have_income_certificate',
  },
  incomeCertNo: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: true,
    field: 'income_cert_no',
  },
  incomeIssAuthority: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'income_Iss_Authority',
  },
  incomeDoc: {
    type: Sequelize.DataTypes.STRING(255),
    allowNull: true,
    field: 'income_doc',
  },
  incomeIssuedDate: {
    type: Sequelize.DataTypes.DATE,
    allowNull: false,
    field: 'income_issued_date',
  },
  doYouHaveDomicileMaharashtraKarnataka: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'do_you_have_Domicile_maharashtra_karnataka',
  },
  doYouHaveDomicileCertificate: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'do_you_have_domicile_certificate',
  },
  domicileRelationType: {
    type: Sequelize.DataTypes.STRING(30),
    allowNull: true,
    field: 'domicile_relation_type',
  },
  domicileCertNumber: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: true,
    field: 'domicilecertnumber',
  },
  domicileApplicantName: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'domicile_applicant_name',
  },
  domicileIssuedAuthority: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'domicile_issued_authority',
  },
  domicileDoc: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'domicile_doc',
  },
  domicileIssuedDate: {
    type: Sequelize.DataTypes.DATE,
    allowNull: true,
    field: 'domicile_issued_date',
  },
  doYouHaveDisability: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'do_you_have_disability',
  },
  disabilityType: {
    type: Sequelize.DataTypes.STRING(20),
    allowNull: true,
    field: 'disability_type',
  },
  disabilityName: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'disability_name',
  },
  doYouHaveDisabilityCertificate: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'do_you_have_disability_certificate',
  },
  disabilityCertificateNo: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: true,
    field: 'disability_certificate_no',
  },
  disabilityPercentage: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
    field: 'disability_percentage',
  },
  disabilityIssuedDate: {
    type: Sequelize.DataTypes.DATE,
    allowNull: true,
    field: 'disability_issued_date',
  },
  disabilityIssuingAuthority: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'disability_issuing_authority',
  },
  disabilityDoc: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'disabilty_doc',
  }, doYouHaveDisability: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'do_you_have_disability',
  },
  disabilityType: {
    type: Sequelize.DataTypes.STRING(20),
    allowNull: true,
    field: 'disability_type',
  },
  disabilityName: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'disability_name',
  },
  doYouHaveDisabilityCertificate: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'do_you_have_disability_certificate',
  },
  disabilityCertificateNo: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: true,
    field: 'disability_certificate_no',
  },
  disabilityPercentage: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
    field: 'disability_percentage',
  },
  disabilityIssuingAuthority: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'disability_issuing_authority',
  },
  disabilityDoc: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'disabilty_doc',
  },
  disabilityIssuedDate: {
    type: Sequelize.DataTypes.DATE,
    allowNull: true,
    field: 'disability_issued_date',
  },
  bankaccName: {
    type: Sequelize.DataTypes.STRING(255),
    allowNull: false,
    field: 'bankacc_name',
  },
  bankIfsc: {
    type: Sequelize.DataTypes.STRING(255),
    allowNull: false,
    field: 'bank_ifsc',
  },
  permanentVillage: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'permanent_village',
  },
  correspoAddressSameAsPermanent: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'Correspo_Address_same_as_permanent_address',
  },
  correspondanceDistrict: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'correspondance_district',
  },
  correspondanceTaluka: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
    field: 'correspondance_taluka',
  },
  correspondanceAddress: {
    type: Sequelize.DataTypes.STRING(255),
    allowNull: true,
    field: 'correspondance_address',
  },
  correspondanceState: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'correspondance_state',
  },
  correspondanceVillage: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'correspondance_village',
  },
  correspondancePincode: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: true,
    field: 'correspondance_pincode',
  },
  isFatherAlive: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: false,
    field: 'is_father_alive',
  },
  fatherName: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: false,
    field: 'Fathername',
  },
  fatherOccupation: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: false,
    field: 'father_Occupation',
  },
  fatherSalaried: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'father_salaried',
  },
  motherAlive: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'mother_alive',
  },
  motherName: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'Mothername',
  },
  motherOccupation: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'mother_Occupation',
  },
  isMotherSalaried: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: false,
    field: 'is_mother_salaried',
  },
  guardianName: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: false,
    field: 'Guardianname',
  },
  guardianAddress: {
    type: Sequelize.DataTypes.STRING(255),
    allowNull: true,
    field: 'Guardianaddress',
  },
  guardianOccupation: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'GuardianOcuupation',
  },
  isGuardianSalaried: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'is_Guardiansallaried',
  },
  guardianRelationType: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: false,
    field: 'guardian_Relationtype',
  },
  guardianCertificateDoc: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'guardian_certificate_doc',
  },
  admissionYear: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
    field: 'admission_year',
  },
  instituteState: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'institute_state',
  },
  instituteDistrict: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'institute_district',
  },
  instituteTaluka: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'institute_taluka',
  },
  qualificationLevel: {
    type: Sequelize.DataTypes.STRING(20),
    allowNull: true,
    field: 'qualification_level',
  },
  courseStream: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'course_stream',
  },
  instituteName: {
    type: Sequelize.DataTypes.STRING(255),
    allowNull: true,
    field: 'institute_name',
  },
  coursename: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: false,
    field: 'coursename'
  },
  admissionType: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: false,
    field: 'AdmissionType',
  },

  cetPercentAge: {
    type: Sequelize.DataTypes.DECIMAL(5, 2),
    allowNull: false,
    field: 'CET_Percentage',
  },
  admissionApplicationId: {
    type: Sequelize.DataTypes.STRING(20),
    allowNull: true,
    field: 'admission_application_id',
  },
  admissionLetterDoc: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'admission_letter_doc',
  },
  currentYear: {
    type: Sequelize.DataTypes.STRING(20),
    allowNull: true,
    field: 'current_year',
  },
  isCompletedPursuing: {
    type: Sequelize.DataTypes.STRING(20),
    allowNull: true,
    field: 'is_completed_pursuing',
  },
  admissionDate: {
    type: Sequelize.DataTypes.DATE,
    allowNull: true,
    field: 'admission_date',
  },
  feesPaid: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: true,
    field: 'fees_paid',
  },
  feeReceiptDoc: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'fee_reciept_doc',
  },
  admissionCategory: {
    type: Sequelize.DataTypes.STRING(20),
    allowNull: true,
    field: 'admission_category',
  },
  modeStudy: {
    type: Sequelize.DataTypes.STRING(20),
    allowNull: true,
    field: 'mode_study',
  },
  class10Qualification: {
    type: Sequelize.DataTypes.STRING(30),
    allowNull: true,
    field: 'class10_qualification',
  },
  class10Stream: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'class10_stream',
  },
  class10State: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'class10_state',
  },
  class10District: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'class10_district',
  },
  class10Taluka: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'class10_taluka',
  },
  class10Course: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'class10_course',
  },
  class10Board: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'class10_board',
  },
  class10Mode: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: false,
    field: 'class10_mode',
  },
  class10AdmissionYear: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
    field: 'class10_admission_year',
  },
  class10PassingYear: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    field: 'class10_passing_year',
  },
  class10Result: {
    type: Sequelize.DataTypes.STRING(20),
    allowNull: false,
    field: 'class10_result',
  },
  class10Percentage: {
    type: Sequelize.DataTypes.DECIMAL(5, 2),
    allowNull: true,
    field: 'class10_percentage',
  },
  class10Attempt: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
    field: 'class10_attempt',
  },
  class10Doc: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'class10_doc',
  },
  class10Mode: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'class10_mode',
  },
  class10SeatNumber: {
    type: Sequelize.DataTypes.STRING(30),
    allowNull: true,
    field: 'class10_seatnumber',
  },
  class10MonthOfExam: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'class10_monthofexam',
  },
  class10MarksObtained: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
    field: 'class10_marks_obtained',
  },
  class10Attempts: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    field: 'class10_attempt',
  },
  class12QualificationLevel: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'class12_qualification_level',
  },
  class12Stream: {
    type: Sequelize.DataTypes.STRING(12),
    allowNull: true,
    field: 'class12_stream',
  },
  class12InstituteState: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'class12_institute_state',
  },
  class12InstituteDistrict: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'class12_institute_district',
  },
  class12Taluka: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'class12_taluka',
  },
  class12CollegeName: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'class12_college_name',
  },
  class12Course: {
    type: Sequelize.DataTypes.STRING(30),
    allowNull: true,
    field: 'class12_course',
  },
  class12Board: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'class12_board',
  },
  class12SeatNumber: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'class12_seatnumber',
  },
  class12Mode: {
    type: Sequelize.DataTypes.STRING(20),
    allowNull: true,
    field: 'class12_mode',
  },
  class12SeatNumber: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'class12_seatnumber',
  },
  class12AdmissionYear: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    field: 'class12_admission_year',
  },
  class12PassingYear: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
    field: 'class12_passing_year',
  },
  class12Result: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'class12_result',
  },
  class12Percentage: {
    type: Sequelize.DataTypes.DECIMAL(5, 2),
    allowNull: true,
    field: 'class12_percentage',
  },
  class12Attempts: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
    field: 'class12_attempts',
  },
  class12Doc: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'class12_doc',
  },
  doYouHaveGap: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'do_you_have_gap',
  },
  gapYear: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
    field: 'gap_year',
  },
  gapDoc: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'gap_doc',
  },
  areYouHostellerDayScholar: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'are_you_hosteller_day_scholar',
  },
  hostelState: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'hostel_state',
  },
  hostelDistrict: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'hostel_district',
  },
  hostelTaluka: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true,
    field: 'hostel_taluka',
  },
  hostelType: {
    type: Sequelize.DataTypes.STRING(20),
    allowNull: true,
    field: 'hostel_type',
  },
  hostelName: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'hostel_name',
  },
  hostelAddress: {
    type: Sequelize.DataTypes.STRING(255),
    allowNull: true,
    field: 'hostel_address',
  },
  hostelPincode: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: true,
    field: 'hostel_pincode',
  },
  hostelAdmissionDate: {
    type: Sequelize.DataTypes.DATE,
    allowNull: true,
    field: 'hostel_admission_date',
  },
  hostelDoc: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'hostel_doc',
  },
  candidateEligible: {
    type: Sequelize.DataTypes.STRING(10),
    allowNull: true,
    field: 'candidate_eligible',
  },
  applicationSubmissionDate: {
    type: Sequelize.DataTypes.DATE,
    allowNull: true,
    field: 'application_submission_date',
  },
  applicationFailedReason: {
    type: Sequelize.DataTypes.STRING(255),
    allowNull: true,
    field: 'application_failed_reason',
  },
  applicationStatus: {
    type: Sequelize.DataTypes.STRING(30),
    allowNull: true,
    field: 'application_status',
  },
  eligibleScheme1: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: true,
    field: 'eligible_scheme_1',
  },
  email: {
    type: Sequelize.DataTypes.STRING(30),
    allowNull: false,
    // unique: true,
    field: 'email',
  },
  mahadbt_username: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  mahadbt_password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  ref_code: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  prev_qualification_level: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  aadhaar_number: {
    type: Sequelize.DataTypes.STRING(12),
    allowNull: true,
    field: 'aadhaar_number',
  },
  alpabhudharakDoc: {
    type: Sequelize.DataTypes.STRING(12),
    allowNull: true,
    field: 'Alpa_bhu_dharak_Shetkari_Doc',
  },
  labourDoc: {
    type: Sequelize.DataTypes.STRING(12),
    allowNull: true,
    field: 'Registered_labour_Doc',
  }, 
  declarationCertificateDoc: {
    type: Sequelize.DataTypes.STRING(12),
    allowNull: true,
    field: 'Declaration_Certificate_Doc',
  },  
  studentPanCard: {
    type: Sequelize.DataTypes.STRING(12),
    allowNull: true,
    field: 'Student_Pan_Card',
  },
  fatherPanCard: {
    type: Sequelize.DataTypes.STRING(12),
    allowNull: true,
    field: 'Father_Pancard_Doc',
  },
  fatherAadhaarCard: {
    type: Sequelize.DataTypes.STRING(12),
    allowNull: true,
    field: 'Father_Aadhaar_Doc',
  },
  casteValidityDoc: {
    type: Sequelize.DataTypes.STRING(12),
    allowNull: true,
    field: 'Caste_Validity_Doc',
  },

});

module.exports = dummyModel;
