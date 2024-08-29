// const { Op } = require("sequelize");
const { Sequelize, Op } = require("sequelize");
const multer = require("multer");
const ExcelJS = require("exceljs");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
const { QueryTypes } = require("sequelize");

const storage = multer.memoryStorage();

// const ExcelInfo = require("../models/testExcelModel");
const Mahadbtprofiles = require("../models/mahadbtModel");

// const executeStoredProcedure = require('./database/storedProcedures');
const dotenv = require("dotenv");
const sequelize = require("../database/connection");
const dummyModel = require("../models/dummyExcelModel");

dotenv.config();

async function createStoredProcedure() {
  // Assuming 'sequelize' is your Sequelize instance
  sequelize
    .query("DROP PROCEDURE IF EXISTS NewTest2", { type: QueryTypes.RAW })
    .then(() => {
      return sequelize.query(
        `
    CREATE PROCEDURE NewTest2()
    BEGIN
      UPDATE mahadbt_profiles
      SET coursename = 'rahul'
      WHERE coursename = 'vivek';

      UPDATE mahadbt_profiles
      SET CasteCategory = 'JayBhim'
      WHERE CasteCategory = 'Open';

      UPDATE excel_profiles
      SET qualifyingExam = 'H.S.C. (12 Std)'
      WHERE qualifyingExam = 'HSC';
    END;
  `,
        { type: QueryTypes.RAW }
      );
    })
    .then((result) => {
      console.log("Procedure created successfully:", result);
    })
    .catch((error) => {
      console.error("Error executing procedure creation:", error);
    });
}

const UpdateClass12BoardData = async () => {
  try {
    await sequelize.query(`
      CREATE PROCEDURE UpdateClass12Board()
      BEGIN
          UPDATE excel_profiles
          SET hscBoard = 'MAHARASHTRA STATE BOARD OF SECONDARY AND HIGHER SECONDARY EDUCATION'
          WHERE hscBoard LIKE '%Maharashtra State Board of Secondary Education , Pune%';
      END;
    `);

    console.log("Stored procedure created successfully.");

    // Execute the stored procedure
    // const result = await sequelize.query('CALL UpdateClass12Board', { type: Sequelize.QueryTypes.RAW });
    // console.log('Stored procedure result:', result[0]);
  } catch (error) {
    console.error("Error creating or executing stored procedure:", error);
  } finally {
    // Don't forget to remove the stored procedure afterward if needed
    await sequelize.query("DROP PROCEDURE IF EXISTS UpdateClass10Board");
  }
};

async function loadAndExecuteStoredProcedure() {
  const result = await sequelize.query("CALL updateData()", {
    type: Sequelize.QueryTypes.RAW,
  });
  // console.log('Stored procedure result:', result[0]);
  // Log the structure of the result to understand its format
  console.log("Result structure:", result);

  // Process the result as needed
  // console.log("FINALLLL", result);
}

exports.uploadFile = async (req, res) => {
  // console.log("req.files.vivek::::::", req.files.vivek);
  // working code for excel file present in the body!!!!
  const workbook = xlsx.read(req.files.vivek.data, { type: "buffer" });
  const sheetName = workbook.SheetNames[0]; // Assuming you want the first sheet
  const sheet = workbook.Sheets[sheetName];
  // console.log("SHEETNAME :: ", sheetName);
  const data = xlsx.utils.sheet_to_json(sheet);

  // console.log("Sheet Data:", data);

  //   try {
  //     const batchSize = 10; // Set your desired batch size
  //     const totalRecords = data.length;

  //     for (let i = 0; i < totalRecords; i += batchSize) {
  //       const batch = data.slice(i, i + batchSize);

  //       const filteredData = batch.map((item) => ({
  //         admissionApplicationId: item["Application ID"],
  //         candidateName: item["Candidate Name"],
  //         gender: item["Gender"],
  //         dob: new Date(item["DOB"]), // Assuming DOB is in a valid date format
  //         class10Board: item["SSC Board"],
  //         class10PassingYear: item["SSC Passing Year"],
  //         class10SeatNumber: item["SSC Seat No"],
  //         class10Percentage: item["SSC Total Percentage"],
  //         prev_qualification_level: item["Qualifying Exam"],
  //         class12Board: item["HSC Board"],
  //         class12PassingYear: item["HSC Passing Year"],
  //         class12SeatNumber: item["HSC Seat No"],
  //         class12Percentage: item["HSC Total Percentage"],
  //         cetPercentAge: item["CET Percentile"],
  //         coursename: item["Course Name"],
  //       }));

  //       const createdData = await dummyModel.bulkCreate(filteredData, {
  //         updateOnDuplicate: ["email"],
  //         // ignoreDuplicates: true,
  //       });

  //       console.log(`Batch ${i / batchSize + 1} inserted successfully.`);
  //     }

  //     console.log("All data inserted successfully");
  //     res.json({
  //       success: true,
  //       message: "All data inserted successfully",
  //     });
  //   } catch (error) {
  //     console.error("Error inserting data:", error);
  //     res.json({
  //       success: false,
  //       message: "Error inserting data",
  //     });
  //   }
  // }

  try {
    // ExcelInfo.bulkCreate(data);

    const filteredData = data.map((item) => ({
      // applicationId = field
      // Application ID = column name in excel file
      admissionApplicationId: item["Application ID"],
      candidateName: item["Candidate Name"],
      gender: item["Gender"],
      dob: new Date(item["DOB"]), // Assuming DOB is in a valid date format
      class10Board: item["SSC Board"],
      class10PassingYear: item["SSC Passing Year"],
      class10SeatNumber: item["SSC Seat No"],
      class10Percentage: item["SSC Total Percentage"],
      prev_qualification_level: item["Qualifying Exam"],
      class12Board: item["HSC Board"],
      class12PassingYear: item["HSC Passing Year"],
      class12SeatNumber: item["HSC Seat No"],
      class12Percentage: item["HSC Total Percentage"],
      cetPercentAge: item["CET Percentile"],
      coursename: item["Course Name"],
      email: item["Email"],
      casteCategory: item["Catogory"],
      ref_code: item["REF_CODE"],
      applicationStatus: item["Application Status"],
      currentYear: item["Course Year"],

      // Adding extra columns as per sheet
      alternateMobileNumber: item["alternate_mobile_number"],
      whatsappNumber: item["whatsapp_number"],
      parentMobileNumber: item["parent_mobile_number"],
      maritalStatus: item["marital_status"],
      religion: item["religion"],
      casteCategory: item["CasteCategory"],
      SubCaste: item["SubCaste"],
      doYouHaveCasteCertificate: item["do_you_have_caste_certificate"],
      casteCertificateNumber: item["caste_certificate_number"],
      casteIssuedDistrict: item["caste_issued_district"],
      casteApplicantName: item["caste_applicantName"],
      casteIssuingAuthority: item["caste_Iss_Authority"],
      casteDoc: item["caste_doc"],
      casteIssuedDate: item["caste_issued_date"],
      annualFamilyIncome: item["annual_family_income"],
      doYouHaveIncomeCertificate: item["do_you_have_income_certificate"],
      incomeCertNo: item["income_cert_no"],
      incomeIssAuthority: item["income_Iss_Authority"],
      incomeDoc: item["income_doc"],
      incomeIssuedDate: item["income_issued_date"],
      doYouHaveDomicileMaharashtraKarnataka:
        item["do_you_have_Domicile_maharashtra_karnataka"],
      doYouHaveDomicileCertificate: item["do_you_have_domicile_certificate"],
      domicileRelationType: item["domicile_relation_type"],
      domicileCertNumber: item["domicilecertnumber"],
      domicileApplicantName: item["domicile_applicant_name"],
      domicileIssuedAuthority: item["domicile_issued_authority"],
      domicileDoc: item["domicile_doc"],
      domicileIssuedDate: item["domicile_issued_date"],
      doYouHaveDisability: item["do_you_have_disability"],
      disabilityType: item["disability_type"],
      disabilityName: item["disability_name"],
      doYouHaveDisabilityCertificate:
        item["do_you_have_disability_certificate"],
      disabilityCertificateNo: item["disability_certificate_no"],
      disabilityPercentage: item["disability_percentage"],
      disabilityIssuedDate: item["disability_issued_date"],
      disabilityIssuingAuthority: item["disability_issuing_authority"],
      disabilityDoc: item["disabilty_doc"],
      bankaccName: item["bankacc_name"],
      bankIfsc: item["bank_ifsc"],
      permanentVillage: item["permanent_village"],
      correspoAddressSameAsPermanent:
        item["Correspo_Address_same_as_permanent_address"],
      correspondanceDistrict: item["correspondance_district"],
      correspondanceTaluka: item["correspondance_taluka"],
      correspondanceAddress: item["correspondance_address"],
      correspondanceState: item["correspondance_state"],
      correspondanceVillage: item["correspondance_village"],
      correspondancePincode: item["correspondance_pincode"],
      isFatherAlive: item["is_father_alive"],
      fatherName: item["Fathername"],
      fatherOccupation: item["father_Occupation"],
      fatherSalaried: item["father_salaried"],
      motherAlive: item["mother_alive"],
      motherName: item["Mothername"],
      motherOccupation: item["mother_Occupation"],
      isMotherSalaried: item["is_mother_salaried"],
      guardianName: item["Guardianname"],
      guardianAddress: item["Guardianaddress"],
      guardianOccupation: item["GuardianOcuupation"],
      isGuardianSalaried: item["is_Guardiansallaried"],
      guardianRelationType: item["guardian_Relationtype"],
      guardianCertificateDoc: item["guardian_certificate_doc"],
      admissionYear: item["admission_year"],
      instituteState: item["institute_state"],
      instituteDistrict: item["institute_district"],
      instituteTaluka: item["institute_taluka"],
      qualificationLevel: item["qualification_level"],
      courseStream: item["course_stream"],
      instituteName: item["institute_name"],
      admissionType: item["AdmissionType"],
      cetPercentAge: item["CET_Percentage"],
      admissionLetterDoc: item["admission_letter_doc"],

      isCompletedPursuing: item["is_completed_pursuing"],
      admissionDate: item["admission_date"],
      feesPaid: item["fees_paid"],
      feeReceiptDoc: item["fee_reciept_doc"],
      modeStudy: item["mode_study"],

      class10Qualification: item["class10_qualification"],
      class10Stream: item["class10_stream"],
      class10State: item["class10_state"],
      class10District: item["class10_district"],
      class10Taluka: item["class10_taluka"],
      class10Course: item["class10_tclass10_courseluka"],
      class10Board: item["class10_mode"],
      class10Mode: item["class10_mode"],

      class10AdmissionYear: item["class10_admission_year"],
      class10PassingYear: item["class10_passing_year"],
      class10Result: item["class10_result"],

      class10Percentage: item["class10_percentage"],
      class10Attempt: item["class10_attempt"],
      class10Doc: item["class10_doc"],
      class10SeatNumber: item["class10_seatnumber"],
      class10MonthOfExam: item["class10_monthofexam"],
      class10MarksObtained: item["class10_marks_obtained"],
      class12QualificationLevel: item["class12_qualification_level"],
      class12Stream: item["class12_stream"],
      class12InstituteState: item["class12_institute_state"],
      class12InstituteDistrict: item["class12_institute_district"],
      class12Taluka: item["class12_taluka"],
      class12CollegeName: item["class12_college_name"],
      class12Course: item["class12_course"],
      class12Board: item["class12_board"],
      class12SeatNumber: item["class12_seatnumber"],
      class12Mode: item["class12_mode"],
      class12AdmissionYear: item["class12_admission_year"],
      class12PassingYear: item["class12_passing_year"],
      class12Result: item["class12_result"],
      class12Percentage: item["class12_percentage"],
      class12Attempts: item["class12_attempts"],
      class12Doc: item["class12_doc"],
      doYouHaveGap: item["do_you_have_gap"],
      gapYear: item["gap_year"],
      gapDoc: item["gap_doc"],
      areYouHostellerDayScholar: item["are_you_hosteller_day_scholar"],
      hostelState: item["hostel_state"],
      hostelDistrict: item["hostel_district"],
      hostelTaluka: item["hostel_taluka"],
      hostelType: item["hostel_type"],
      hostelName: item["hostel_name"],
      hostelAddress: item["hostel_address"],
      hostelPincode: item["hostel_pincode"],
      hostelAdmissionDate: item["hostel_admission_date"],
      hostelDoc: item["hostel_doc"],
      candidateEligible: item["candidate_eligible"],
      applicationSubmissionDate: item["application_submission_date"],
      applicationFailedReason: item["application_failed_reason"],

      //
      // applicationStatus: item["application_status"],
      // eligibleScheme1: item["eligible_scheme_1"],
      // email: item["email"],
      // mahadbt_username: item["mahadbt_username"],
      // mahadbt_password: item["mahadbt_password"],
      // ref_code: item["ref_code"],
      // prev_qualification_level: item["prev_qualification_level"],
      // createdAt: item["createdAt"],
      // updatedAt: item["updatedAt"],
      // Mess_Available: item["Mess_Available"],
      // Rent_Per_Month: item["Rent_Per_Month"],
      // First_Schema_Name: item["First_Schema_Name"],
      // Second_Schema_Name: item["Second_Schema_Name"],
      // Department_name: item["Department_name"],
      // Schema_Namee: item["Schema_Namee"],
      // Renewal_Application: item["Renewal_Application"],
      // avail_any_scholarship: item["avail_any_scholarship"],
      // beneficiary_in_family: item["beneficiary_in_family"],
      // undertaking_Not_more_than_two_beneficiary:
      //   item["undertaking_Not_more_than_two_beneficiary"],
      // Is_taking_benefit_of_TFWS: item["Is_taking_benefit_of_TFWS"],
      // Is_admitted_under_EWS_seat: item["Is_admitted_under_EWS_seat"],
      // Renewal_Application_Panjabroa: item["Renewal_Application_Panjabroa"],
      // Registered_labour: item["Registered_labour"],
      // Registered_labour_Doc: item["Registered_labour_Doc"],
      // Alpa_bhu_dharak_Shetkari: item["Alpa_bhu_dharak_Shetkari"],
      // Alpa_bhu_dharak_Shetkari_Doc: item["Alpa_bhu_dharak_Shetkari_Doc"],
      // declaration_Rector_Superintendent:
      //   item["declaration_Rector_Superintendent"],
      // beneficiary_in_family_Panjabroa: item["beneficiary_in_family_Panjabroa"],
      // undertaking_form_that_same_year: item["undertaking_form_that_same_year"],
      // admitted_under_EWS_seat: item["admitted_under_EWS_seat"],
      // Declaration_certificate_of_parents:
      //   item["Declaration_certificate_of_parents"],
      // Leaving_Certificate: item["Leaving_Certificate"],
      // Ration_card: item["Ration_card"],
      // Cast_Validity_Certificate: item["Cast_Validity_Certificate"],
      // CAP_Allotment_Letter: item["CAP_Allotment_Letter"],
      // applied_any_scholarship: item["applied_any_scholarship"],
      // Other_Scholarship_Name: item["Other_Scholarship_Name"],
      // How_Many_boys_child: item["How_Many_boys_child"],
      // Upload_Self_Declaration: item["Upload_Self_Declaration"],
      // Upload_TC_LC: item["Upload_TC_LC"],
      // Upload_Admission_Receipt: item["Upload_Admission_Receipt"],

      // This option will prevent the error from stopping the execution

      // prev_qualification_level :item["Qualifying Exam"]
    }));

    // Bulk insert the filtered data into the ExcelInfo table
    // await dummyModel.bulkCreate(filteredData);
    // ExcelInfo.bulkCreate(filteredData);
    // const createdData = await dummyModel.bulkCreate(filteredData);
    // console.log("filtered dataaaaaaa", filteredData);

    // const createdData = await dummyModel.bulkCreate(filteredData, {
    const createdData = await Mahadbtprofiles.bulkCreate(filteredData, {
      updateOnDuplicate: ["email"], // Specify the fields to update in case of duplicates
      // ignoreDuplicates: true, // This option will prevent the error from stopping the execution
    });

    console.log("Data inserted successfully", createdData);
    // return
    console.log("Data inserted successfully");
    setTimeout(() => {
      console.log("Delayed for 5 second.");
      loadAndExecuteStoredProcedure();
      res.json({
        success: true,
        message: "Data inserted successfully",
        data: createdData,
      });
    }, "5000");
    // loadAndExecuteStoredProcedure()
    // res.json({
    //   success: true,
    //   message: "Data inserted successfully",
    //   data: createdData
    // });
  } catch (error) {
    console.error("Error inserting data:", error);
  }

  // Call the function to execute the stored procedure
};

exports.runTheProcedure = async (req, res) => {
  console.log("test called");
  loadAndExecuteStoredProcedure();
  // UpdateHSCBoard();
  // executeUpdateCourseNameProcedure();
  res.json({ success: true, message: "test called" });
};

console.log("dfdsfs");
exports.createStoreProcedure = async (req, res) => {
  console.log("test called");
  createStoredProcedure();
  UpdateClass12BoardData();
  res.json({ success: true, message: "test called" });
};
