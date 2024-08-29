//this model is used for students section

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const CandidateInfo = sequelize.define('CandidateInfo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  candidate_name: {
    type: DataTypes.STRING(255)
  },
  gender: {
    type: DataTypes.STRING(10)
  },
  dob: {
    type: DataTypes.DATE
  },
  alternate_mobile_number: {
    type: DataTypes.STRING(15)
  },
  whatsapp_number: {
    type: DataTypes.STRING(15)
  },
  parent_mobile_number: {
    type: DataTypes.STRING(15)
  },
  marital_status: {
    type: DataTypes.STRING(20)
  },
  religion: {
    type: DataTypes.STRING(50)
  },
  caste_category: {
    type: DataTypes.STRING(50)
  },
  sub_caste: {
    type: DataTypes.STRING(50)
  },
  do_you_have_caste_certificate: {
    type: DataTypes.BOOLEAN
  },
  caste_certificate_number: {
    type: DataTypes.STRING(50)
  },
  caste_issued_district: {
    type: DataTypes.STRING(50)
  },
  caste_applicant_name: {
    type: DataTypes.STRING(255)
  },
  caste_iss_authority: {
    type: DataTypes.STRING(255)
  },
  caste_doc: {
    type: DataTypes.TEXT
  },
  caste_issued_date: {
    type: DataTypes.DATE
  },
  annual_family_income: {
    type: DataTypes.INTEGER
  },
  do_you_have_income_certificate: {
    type: DataTypes.BOOLEAN
  },
  income_cert_no: {
    type: DataTypes.STRING(50)
  },
  income_iss_authority: {
    type: DataTypes.STRING(255)
  },
  income_doc: {
    type: DataTypes.TEXT
  },
  income_issued_date: {
    type: DataTypes.DATE
  },
  do_you_have_domicile_maharashtra_karnataka: {
    type: DataTypes.BOOLEAN
  },
  do_you_have_domicile_certificate: {
    type: DataTypes.BOOLEAN
  },
  domicile_relation_type: {
    type: DataTypes.STRING(50)
  },
  domicile_cert_number: {
    type: DataTypes.STRING(50)
  },
  domicile_applicant_name: {
    type: DataTypes.STRING(255)
  },
  domicile_issued_authority: {
    type: DataTypes.STRING(255)
  },
  domicile_doc: {
    type: DataTypes.TEXT
  },
  domicile_issued_date: {
    type: DataTypes.DATE
  },
  do_you_have_disability: {
    type: DataTypes.BOOLEAN
  },
  disability_type: {
    type: DataTypes.STRING(50)
  },
  disability_name: {
    type: DataTypes.STRING(50)
  },
  do_you_have_disability_certificate: {
    type: DataTypes.BOOLEAN
  },
  disability_certificate_no: {
    type: DataTypes.STRING(50)
  },
  disability_percentage: {
    type: DataTypes.INTEGER
  },
  disability_issued_date: {
    type: DataTypes.DATE
  },
  disability_issuing_authority: {
    type: DataTypes.STRING(255)
  },
  disability_doc: {
    type: DataTypes.TEXT
  },
  bank_acc_name: {
    type: DataTypes.STRING(255)
  },
  bank_ifsc: {
    type: DataTypes.STRING(11)
  },
  permanent_village: {
    type: DataTypes.STRING(255)
  },
  correspo_address_same_as_permanent_address: {
    type: DataTypes.BOOLEAN
  },
  correspondance_district: {
    type: DataTypes.STRING(50)
  },
  correspondance_taluka: {
    type: DataTypes.STRING(50)
  },
  correspondance_address: {
    type: DataTypes.TEXT
  },
  correspondance_state: {
    type: DataTypes.STRING(50)
  },
  correspondance_village: {
    type: DataTypes.STRING(255)
  },
  correspondance_pincode: {
    type: DataTypes.STRING(10)
  },
  is_father_alive: {
    type: DataTypes.BOOLEAN
  },
  father_name: {
    type: DataTypes.STRING(255)
  },
  father_occupation: {
    type: DataTypes.STRING(50)
  },
  father_salaried: {
    type: DataTypes.BOOLEAN
  },
  mother_alive: {
    type: DataTypes.BOOLEAN
  },
  mother_name: {
    type: DataTypes.STRING(255)
  },
  mother_occupation: {
    type: DataTypes.STRING(50)
  },
  is_mother_salaried: {
    type: DataTypes.BOOLEAN
  },
  guardian_name: {
    type: DataTypes.STRING(255)
  },
  guardian_address: {
    type: DataTypes.TEXT
  },
  guardian_occupation: {
    type: DataTypes.STRING(50)
  },
  is_guardian_salaried: {
    type: DataTypes.BOOLEAN
  },
  guardian_relation_type: {
    type: DataTypes.STRING(50)
  },
  guardian_certificate_doc: {
    type: DataTypes.TEXT
  },
  admission_year: {
    type: DataTypes.INTEGER
  },
  institute_state: {
    type: DataTypes.STRING(50)
  },
  institute_district: {
    type: DataTypes.STRING(50)
  },
  institute_taluka: {
    type: DataTypes.STRING(50)
  },
  qualification_level: {
    type: DataTypes.STRING(50)
  },
  course_stream: {
    type: DataTypes.STRING(50)
  },
  institute_name: {
    type: DataTypes.STRING(255)
  },
  course_name: {
    type: DataTypes.STRING(255)
  },
  admission_type: {
    type: DataTypes.STRING(50)
  },
  cet_percentage: {
    type: DataTypes.INTEGER
  },
  admission_application_id: {
    type: DataTypes.STRING(50)
  },
  admission_letter_doc: {
    type: DataTypes.TEXT
  },
  current_year: {
    type: DataTypes.INTEGER
  },
  is_completed_pursuing: {
    type: DataTypes.BOOLEAN
  },
  admission_date: {
    type: DataTypes.DATE
  },
  fees_paid: {
    type: DataTypes.INTEGER
  },
  fee_receipt_doc: {
    type: DataTypes.TEXT
  },
  admission_category: {
    type: DataTypes.STRING(50)
  },
  mode_study: {
    type: DataTypes.STRING(50)
  },
  class10_qualification: {
    type: DataTypes.STRING(50)
  },
  class10_stream: {
    type: DataTypes.STRING(50)
  },
  class10_state: {
    type: DataTypes.STRING(50)
  },
  class10_district: {
    type: DataTypes.STRING(50)
  },
  class10_taluka: {
    type: DataTypes.STRING(50)
  },
  class10_course: {
    type: DataTypes.STRING(50)
  },
  class10_board: {
    type: DataTypes.STRING(50)
  },
  class10_mode: {
    type: DataTypes.STRING(50)
  },
  class10_admission_year: {
    type: DataTypes.INTEGER
  },
  class10_passing_year: {
    type: DataTypes.INTEGER
  },
  class10_result: {
    type: DataTypes.STRING(50)
  },
  class10_percentage: {
    type: DataTypes.INTEGER
  },
  class10_attempt: {
    type: DataTypes.INTEGER
  },
  class10_doc: {
    type: DataTypes.TEXT
  },
  class10_seat_number: {
    type: DataTypes.STRING(50)
  },
  class10_month_of_exam: {
    type: DataTypes.STRING(20)
  },
  class10_marks_obtained: {
    type: DataTypes.INTEGER
  },
  class12_qualification_level: {
    type: DataTypes.STRING(50)
  },
  class12_stream: {
    type: DataTypes.STRING(50)
  },
  class12_institute_state: {
    type: DataTypes.STRING(50)
  },
  class12_institute_district: {
    type: DataTypes.STRING(50)
  },
  class12_taluka: {
    type: DataTypes.STRING(50)
  },
  class12_college_name: {
    type: DataTypes.STRING(255)
  },
  class12_course: {
    type: DataTypes.STRING(50)
  },
  class12_board: {
    type: DataTypes.STRING(50)
  },
  class12_seat_number: {
    type: DataTypes.STRING(50)
  },
  class12_mode: {
    type: DataTypes.STRING(50)
  },
  class12_admission_year: {
    type: DataTypes.INTEGER
  },
  class12_passing_year: {
    type: DataTypes.INTEGER
  },
  class12_result: {
    type: DataTypes.STRING(50)
  },
  class12_percentage: {
    type: DataTypes.INTEGER
  },
  class12_attempts: {
    type: DataTypes.INTEGER
  },
  class12_doc: {
    type: DataTypes.TEXT
  },
  do_you_have_gap: {
    type: DataTypes.BOOLEAN
  },
  gap_year: {
    type: DataTypes.INTEGER
  },
  gap_doc: {
    type: DataTypes.TEXT
  },
  are_you_hosteller_day_scholar: {
    type: DataTypes.STRING(50)
  },
  hostel_state: {
    type: DataTypes.STRING(50)
  },
  hostel_district: {
    type: DataTypes.STRING(50)
  },
  hostel_taluka: {
    type: DataTypes.STRING(50)
  },
  hostel_type: {
    type: DataTypes.STRING(50)
  },
  hostel_name: {
    type: DataTypes.STRING(255)
  },
  hostel_address: {
    type: DataTypes.TEXT
  },
  hostel_pincode: {
    type: DataTypes.STRING(10)
  },
  hostel_admission_date: {
    type: DataTypes.DATE
  },
  hostel_doc: {
    type: DataTypes.TEXT
  },
  candidate_eligible: {
    type: DataTypes.BOOLEAN
  },
  application_submission_date: {
    type: DataTypes.DATE
  },
  application_failed_reason: {
    type: DataTypes.TEXT
  },
  application_status: {
    type: DataTypes.STRING(50)
  },
  eligible_scheme_1: {
    type: DataTypes.BOOLEAN
  },
  email: {
    type: DataTypes.STRING(255)
  },
  mahadbt_username: {
    type: DataTypes.STRING(255)
  },
  mahadbt_password: {
    type: DataTypes.STRING(255)
  },
  ref_code: {
    type: DataTypes.STRING(50)
  },
  prev_qualification_level: {
    type: DataTypes.STRING(50)
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  mess_available: {
    type: DataTypes.BOOLEAN
  },
  rent_per_month: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: false,
  tableName: 'candidate_info'
});

module.exports = CandidateInfo;
