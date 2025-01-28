const { Sequelize } = require("sequelize");
const sequelize = require("../database/connection"); // Adjust the path to your sequelize instance
const { DataTypes } = require('sequelize');

const RenewalMahadbt = sequelize.define('RenewalMahadbt', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Mahadbt_Username: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Mahadbt_Password: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'mahadbt_password',
    },
    candidateName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Name_Of_Candidate',
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Candidate_Email',
    },
    whatsappNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Candidate_MobileNumber',
    },
    alternateMobileNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Alternate_Mobile_Number',
    },
    referenceId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Refrence_ID',
    },
    aadhar_number: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Candidate_Adhar_Number',
    },

    //income section
    annualIncome: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Annual_Income',
    },
    incomeCertYesNo: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Income_Certificate',
    },
    incomeCertNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'incomecertificate_Number',
    },
    incomeIssuingAuthority: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Issauthority_income',
    },
    incomeIssueDate: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'income_issued_date',
    },

    //Current Course Section  
    instituteName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'institute_name',
    },
    instituteState: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'institute_state',
    },
    instituteDistrict: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'institute_district',
    },
    instituteTaluka: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'institute_taluka',
    },
    presentYearOfStudy: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Present_Year_Of_Study',
    },
    pastYearOfStudy: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Past_Year_Of_Study',
    },
    presentYearCompletedPursuing: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Present_Year_Completed_Pursuing',
    },
    pastYearCompletedPursuing: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Past_Year_Completed_Pursuing',
    },
    resultPassedAtkt: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Result',
    },
    previousYearPercentage: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Percentage',
    },
    //{marksheet passed year is in docs section}, 
    admissionYearOfThatCourse: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Admission_Year_Of_That_Course',
    },
    admissionDateCurrentCourse: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Admission_Date_Current_Course',
    },
    admissionYear: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'admission_year',
    },
    qualificationLevel: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'qualification_level',
    },
    courseStream: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'course_stream',
    },
    courseName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'coursename',
    },
    admissionType: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'AdmissionType',
    },
    cetPercent: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'CET_Percentage',
    },
    admissionApplicationId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'admission_application_id',
    },
    // {admission_letter_doc is in docs section}
    feesPaidCurrentCourse: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Fees_Paid_Current_Course',
    },
    //{Fees_Admission_Receipt_bonafide_Doc is in docs section}
    isThereAnyGap: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Is_There_Any_Gap',
    },
    gapReason: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Gap_Reason',
    },
    admissionCasteCateogary: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Admission_Category',
    },

    //Hostel section
    areYouHostellerDayScholar: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Hostel_Category',
    },
    hostelType: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Hostel_Type',
    },
    hostelPgName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Hostet_PG_Name',
    },
    hostelPgAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Hostet_PG_Address',
    },
    hostelPgPincode: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Hostet_PG_Pincode',
    },
    hostelAdmissionDate: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Admission_Date_Hostel',
    },
    isMessAvailable: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Is_Mess_Available',
    },
    rentPerMonth: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Rent_Per_Month',
    },

    //Scheme wise section
    previousYearApplicationId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Previouse_Year_Application_ID',
    },
    numberOfBeneficiaryInFamily: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Number_Of_Benificary_Family',
    },
    howManyBoysChild: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'How_Many_Boys_Child',
    },
    isYourParentAlphabhudarak: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Is_Your_Parent_AlphaBhuDharak',
    },
    isRegisteredLabour: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Is_Registered_labour',
    },
    admittedUnderEws: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Admited_Under_EWS',
    },



    //documents section
    incomeDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Income_Certificate_URL',
    },
    feeReceiptDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Fees_Admission_Receipt_bonafide_Doc',
    },
    hostelCertificate: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Warden_Certificate_Doc',
    },
    alphabhudharakDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'AlphaBhuDharak_Doc',
    },
    declarationCertDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Declaration_Certificate',
    },
    labourDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Labour_Doc',
    },
    studentPancardDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Student_PanCard_Doc',
    },
    fatherPancardDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Father_PanCard_Doc',
    },
    fatherAadharcardDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Father_Guradian_Adhar_Card_Doc',
    },
    casteValidityDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Caste_Validity',
    },
    allotmentLetterDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'admission_letter_doc',
    },
    leavingCertDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Leaving_Certificate',
    },
    rationCardDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Ration_Card',
    },
    previousYearMarksheetDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Marksheet_Passed_Year',
    },
    gapCertDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Gap_Doc',
    },

    //Verified Section

    personalInfo_verified: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'personalInfo_verified',
    },
    incomeDetails_verified: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'incomeDetails_verified',
    },
    currentCourse_verified: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'currentCourse_verified',
    },
    hostelDetails_verified: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'hostelDetails_verified',
    },
    schemeWise_verified: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'schemeWise_verified',
    },

    student_verified: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'student_verified',
    },

    mahadbt_Login: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'mahadbt_Login',
    },
    // createdAt: {
    //     type: DataTypes.DATE,
    //     allowNull: true,
    //     field: 'createdAt',
    // },
    // modifiedAt: {
    //     type: DataTypes.DATE,
    //     allowNull: true,
    //     field: 'modifiedAt',
    // },

    PreviousYear_SchemeName_1: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'PreviousYear_SchemeName_1',
    },
    PreviousYear_SchemeName_1_Application_ID: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'PreviousYear_SchemeName_1_Application_ID',
    },

    PreviousYear_SchemeName_2: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'PreviousYear_SchemeName_2',
    },

    PreviousYear_SchemeName_2_Application_ID: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'PreviousYear_SchemeName_2_Application_ID',
    },

    Dept_Name: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Dept_Name',
    },

    mahadbt_Login: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'mahadbt_Login',
    },

    is_Income_Valid: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'is_Income_Valid',
    },
    is_FeeReceipt_Valid: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'is_FeeReceipt_Valid',
    },
    is_HostelCert_Valid: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'is_HostelCert_Valid',
    },
    is_Alpabhudarak_Valid: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'is_Alpabhudarak_Valid',
    },
    is_DeclarationCert_Valid: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'is_DeclarationCert_Valid',
    },
    is_LabourCert_Valid: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'is_LabourCert_Valid',
    },
    is_StudentPan_Valid: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'is_StudentPan_Valid',
    },
    is_FatherPan_Valid: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'is_FatherPan_Valid',
    },
    is_FatherAadhaar_Valid: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'is_FatherAadhaar_Valid',
    },
    is_CasteValidity_Valid: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'is_CasteValidity_Valid',
    },
    is_AllotmentCert_Valid: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'is_AllotmentCert_Valid',
    },
    is_LeavingCert_Valid: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'is_LeavingCert_Valid',
    },
    is_RationCard_Valid: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'is_RationCard_Valid',
    },
    is_PreviousYearMarksheet_Valid: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'is_PreviousYearMarksheet_Valid',
    },
    is_GapCert_Valid: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'is_GapCert_Valid',
    },
    Remarks: {
        type: Sequelize.JSON,
        allowNull: true
    },

    profile_Remarks: {
        type: Sequelize.JSON,
        allowNull: true
    },

    Application_Status: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Application_Status',
    },
    hash_password: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'hash_password',
    },
    profile_completion_status: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'profile_completion_status',
    },




}, {
    tableName: 'renewal_mahadbt',
    timestamps: true, // Automatically manages createdAt and updatedAt
    createdAt: 'createdAt', // Maps createdAt to your column name
    updatedAt: 'modifiedAt', // Maps updatedAt to your column name
});

// ✅ Add `beforeUpdate` Hook **AFTER** defining the model
RenewalMahadbt.addHook("beforeUpdate", async (student, options) => {
    const previousData = student._previousDataValues; // Old values
    const updatedData = student.dataValues; // New values
    const updatedBy = options.userId; // User performing the update
    const changes = [];

    // Compare fields and track changes
    for (const field in updatedData) {
        if (updatedData[field] !== previousData[field]) {
            changes.push({
                student_id: student.id,
                updated_by: updatedBy,
                field_name: field,
                old_value: previousData[field],
                new_value: updatedData[field],
            });
        }
    }

    // Log changes in `audit_logs` table
    if (changes.length > 0) {
        await AuditLog.bulkCreate(changes);
    }
});

// ✅ Ensure the model is **exported at the end**
module.exports = RenewalMahadbt;

// module.exports = RenewalMahadbt;

