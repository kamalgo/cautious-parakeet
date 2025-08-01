const PDFDocument = require('pdfkit');

async function createPDF(userData) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });
    doc.on('error', reject);

    // === Formatting helpers ===
    let y = 50;
    const labelFontSize = 11;
    const valueFontSize = 11;
    const sectionTitleFontSize = 14;

    const drawLabelAndValue = (label, value) => {
      doc
        .font('Helvetica-Bold')
        .fontSize(labelFontSize)
        .text(label + ':', { continued: true });

      doc
        .font('Helvetica')
        .fontSize(valueFontSize)
        .text(` ${value ?? '-'}`);

      y = doc.y + 5;
      checkPageEnd();
    };

    const addSectionTitle = (title) => {
      doc
        .font('Helvetica-Bold')
        .fontSize(sectionTitleFontSize)
        .text(title, 50, y);
      y = doc.y + 15;
    };

    const checkPageEnd = () => {
      if (y > 750) {
        doc.addPage();
        y = 50;
      }
    };

    // === Content Generation ===

    // --- Application Details ---
    addSectionTitle('Application Details');
    drawLabelAndValue('Application ID', userData.admissionApplicationId);
    drawLabelAndValue('Current Department 1', userData.currentDept1);
    drawLabelAndValue('Current Scheme 1', userData.currentScheme1);
    drawLabelAndValue('Current Department 2', userData.currentDept2);
    drawLabelAndValue('Current Scheme 2', userData.currentScheme2);
    drawLabelAndValue('Applied Date', userData.applicationSubmissionDate);
    y += 15;

    // --- Personal Details ---
    addSectionTitle('Personal Details');
    drawLabelAndValue('Full Name', userData.candidateName);
    drawLabelAndValue('Mobile Number', userData.alternateMobileNumber);
    drawLabelAndValue('Email ID', userData.email);
    drawLabelAndValue('Date Of Birth', userData.dob);
    drawLabelAndValue('Gender', userData.gender);
    //age not in the db 
    drawLabelAndValue('Religion', userData.religion);
    drawLabelAndValue('Marital Status', userData.maritalStatus);
    drawLabelAndValue('Name as per 10th certificate', userData.candidateName);
    drawLabelAndValue('Parents/Guardian Mobile No', userData.parentMobileNumber);
    drawLabelAndValue('Dependent Type', userData.dependentType);

    y += 15;

    // --- Permanent Address ---
    addSectionTitle('Permanent Address Details');
    drawLabelAndValue('Address', userData.correspondanceAddress);
    drawLabelAndValue('State', userData.correspondanceState);
    drawLabelAndValue('District', userData.correspondanceDistrict);
    drawLabelAndValue('Taluka', userData.correspondanceTaluka);
    drawLabelAndValue('Village', userData.correspondanceVillage);
    drawLabelAndValue('Pincode', userData.correspondancePincode);
    drawLabelAndValue('Is correspondence address same as permanent address', userData.correpoAddressSameAsPermanentAddress);

    y += 15;

    // --- Correspondence Address ---
    addSectionTitle('Correspondence Address Details');
    drawLabelAndValue('Address', userData.correspondanceAddress);
    drawLabelAndValue('State', userData.correspondanceState);
    drawLabelAndValue('District', userData.correspondanceDistrict);
    drawLabelAndValue('Taluka', userData.correspondanceTaluka);
    drawLabelAndValue('Village', userData.correspondanceVillage);
    drawLabelAndValue('Pincode', userData.correspondancePincode);
    drawLabelAndValue('Is correspondence address same as permanent address', userData.correpoAddressSameAsPermanentAddress);
    y += 15;

    // --- Income Details ---
    addSectionTitle('Income Details');
    drawLabelAndValue('Do you have income certificate ?', userData.doYouHaveIncomeCertificate);
    drawLabelAndValue('Does your Income Certificate have a Barcode', userData.incomeCertHasBarcode);
    drawLabelAndValue('Family Annual Income', userData.annualFamilyIncome);
    drawLabelAndValue('Income Certificate No', userData.incomeCertNo);
    drawLabelAndValue('Issuing Authority', userData.incomeIssAuthority);
    drawLabelAndValue('Date of Issue', userData.incomeIssuedDate);
    y += 15;

    // --- Domicile Details ---
    addSectionTitle('Domicile Details');
    drawLabelAndValue('Are you Domicile of Maharashtra ?', userData.doYouHaveDomicileMaharashtraKarnataka);
    drawLabelAndValue('Do you have domicile certificate ?', userData.doYouHaveDomicileCertificate);
    drawLabelAndValue('Domicle Relationship type', userData.domicileRelationType);
    drawLabelAndValue('Domicile Certificate No.', userData.domicileCertNumber);
    drawLabelAndValue('Does your Domicile Certificate have a Barcode?', userData.domicileCertHasBarcode);
    drawLabelAndValue('Applicant name', userData.domicileApplicantName);
    drawLabelAndValue('Issuing Authority', userData.domicileIssuedAuthority);
    drawLabelAndValue('Date of Issue', userData.domicileIssuedDate);
    y += 15;

        // --- Caste Details ---
    addSectionTitle('Caste Details');
    drawLabelAndValue('Do you have caste certificate ?', userData.doYouHaveCasteCertificate);
    drawLabelAndValue('Caste Category', userData.casteCategory);
    drawLabelAndValue('Does your Caste Certificate have a Barcode?', userData.casteCertHasBarcode);
    drawLabelAndValue('Caste Certificate Number', userData.casteCertificateNumber);
    drawLabelAndValue('Issuing District', userData.casteIssuedDistrict);
    drawLabelAndValue('Applicant name', userData.casteApplicantName);
    drawLabelAndValue('Issuing Authority', userData.casteIssAuthority);

    
    y += 15;

    // --- Personal Eligibility Details ---
    drawLabelAndValue('Are you Salaried?', 'No'); //hardcode this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Disability of any type ?', userData.doYouHaveDisability);
    drawLabelAndValue('Type of disability', userData.disabilityType);
    drawLabelAndValue('Name of disability', userData.disabilityName);
    drawLabelAndValue('Disability certificate no.', userData.disabilityCertificateNo);
    drawLabelAndValue('Disability percentage', userData.disabilityPercentage);
    drawLabelAndValue('Disability certificate issue date', userData.disabilityIssuedDate);
    drawLabelAndValue('Issuing authority', userData.disabilityIssuingAuthority);

    // --- Parent/Guardian Details ---
    addSectionTitle('Parent/Guardian Details');
    drawLabelAndValue('Is father alive', userData.isFatherAlive);
    drawLabelAndValue('Father Name', userData.fatherName);
    drawLabelAndValue('Is father salaried', userData.fatherSalaried);
    drawLabelAndValue('Father occupation', userData.fatherOccupation);

    //father occupation
    drawLabelAndValue('Is mother alive', userData.motherAlive);
    drawLabelAndValue('Mother Name', userData.motherName);
    drawLabelAndValue('Is mother salaried', userData.isMotherSalaried);
    drawLabelAndValue('Mother occupation', userData.motherOccupation);
    y += 15;

    // --- Past Qualification Details (10th + 12th) ---
    addSectionTitle('Past Qualification Details 12th');
    // --- Past Qualification Details 12th ---

    drawLabelAndValue('Qualification level', userData.class12QualificationLevel);
    drawLabelAndValue('Stream', userData.class12Stream);
    drawLabelAndValue('Completed', 'Completed'); //hardcode this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Institute state', userData.class12InstituteState);
    drawLabelAndValue('Institute district', userData.class12InstituteDistrict);
    drawLabelAndValue('Institute taluka', userData.class12Taluka);
    drawLabelAndValue('College/School name', userData.class12CollegeName);
    drawLabelAndValue('Course name', userData.class12Course);
    drawLabelAndValue('Board/University', userData.class12Board);
    drawLabelAndValue('Mode', userData.class12Mode);
    drawLabelAndValue('Admission year', userData.class12AdmissionYear);
    drawLabelAndValue('12th Passing Year', userData.class12PassingYear);
    drawLabelAndValue('Result', userData.class12Result);
    drawLabelAndValue('12th Percentage', userData.class12Percentage);
    drawLabelAndValue('Attempts', userData.class12Attempts);
    drawLabelAndValue('Is Gap', 'No'); //hardcode this for now make it dynamic later there is no field in the db

    addSectionTitle('Past Qualification Details 10th');
    // --- Past Qualification Details 10th ---
    drawLabelAndValue('Qualification level', userData.class10Qualification);
    drawLabelAndValue('Stream', userData.class10Stream);
    drawLabelAndValue('Completed', 'Completed'); //hardcode this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Institute state', userData.class10State);
    drawLabelAndValue('Institute district', userData.class10District);
    drawLabelAndValue('Institute taluka', userData.class10Taluka);
    drawLabelAndValue('College Name / School Name',);//do not have the info in the db
    drawLabelAndValue('Course name', userData.class10Course);
    drawLabelAndValue('10th Board/University', userData.class10Board);
    drawLabelAndValue('Mode', userData.class10Mode);
    drawLabelAndValue('Admission year', userData.class10AdmissionYear);
    drawLabelAndValue('10th Passing Year', userData.class10PassingYear);
    drawLabelAndValue('Result', userData.class10Result);
    drawLabelAndValue('10th Percentage', userData.class10Percentage);
    drawLabelAndValue('Attempts', userData.class10Attempt);
    drawLabelAndValue('Is Gap', 'No'); //hardcode this for now make it dynamic later there is no field in the db
    y += 15;

    // --- Current Course Details ---
    addSectionTitle('Current Course Details');
    drawLabelAndValue('Admission Year In Current Course', '2023'); //hardcode this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Institute state', userData.instituteState);
    drawLabelAndValue('Institute district', userData.instituteDistrict);
    drawLabelAndValue('Institute taluka', userData.instituteTaluka);
    drawLabelAndValue('Qualification level', userData.qualificationLevel);
    drawLabelAndValue('Course stream', userData.courseStream);
    drawLabelAndValue('College Name/School Name', userData.instituteName);
    drawLabelAndValue('Course Name', userData.courseName);
    drawLabelAndValue('Admission type', userData.admissionType);
    drawLabelAndValue('Application Admission ID/CAP ID/CLAT Admit Card No', userData.admissionApplicationId);
    drawLabelAndValue('Year of study', userData.currentYear);
    drawLabelAndValue('Completed or pursuig', userData.isCompletedPursuing);
    drawLabelAndValue('Admission date', userData.admissionDate);
    drawLabelAndValue('Admission Year', userData.admissionYear);
    drawLabelAndValue('Percentage','' );//hardcode this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Result','');//hardcode this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Fees paid', userData.feesPaid);
    drawLabelAndValue('Course Type', 'Unaided'); 
    drawLabelAndValue('Admission through open or reserved category', userData.admissionCategory);
    drawLabelAndValue('Gap year', '0'); //hardcode this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Mode', userData.modeStudy);
    drawLabelAndValue('Gap Reason',''); 
    drawLabelAndValue('CET / Merit Percentage / CLAT Score',userData.cetPercentage); 


    y += 15;

    // --- Hostel Details ---
    addSectionTitle('Hostel Details');
    drawLabelAndValue('Hosteller/Day Scholar', userData.areYouHostellerDayScholar);
    drawLabelAndValue('Hostel Type', userData.hostelType);
    drawLabelAndValue('Hostel Name', userData.hostelName);
    drawLabelAndValue('Is Hostel Aided','');
    drawLabelAndValue('Hostel address', userData.hostelAddress);
    drawLabelAndValue('Is mess available ?', userData.messAvailable);
    drawLabelAndValue('Rent Per Month', userData.rentPerMonth);
    drawLabelAndValue('Hostel state', userData.hostelState);
    drawLabelAndValue('Hostel district', userData.hostelDistrict);
    y += 15;



    // --- Additional Question ---
    addSectionTitle('Additional Question');
    drawLabelAndValue('Question Upload Self Declaration (If Applicable)', "-");
    drawLabelAndValue('Question Upload TC / LC', "-");
    drawLabelAndValue('Question Is this a Renewal Application?', "No"); //hardcode this for now make it dynamic later there is no field in the db

    y += 15;

        // --- Fee Details ---
    addSectionTitle('Fee Details');
    drawLabelAndValue('Tuition Fee', '81818.00');//hardcoded this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Development Fee', '8182.00');//hardcoded this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Exam Fee', '2000.00');//hardcoded this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Admission Fee', '0.00');//hardcoded this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Session Fee', '0.00');//hardcoded this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Laboratory Fee', '0.00');//hardcoded this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Semester Fee', '0.00');//hardcoded this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Library Fee', '0.00');//hardcoded this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Gymkhana Fee', '0.00');//hardcoded this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Study Tour', '0.00');//hardcoded this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Enrollment Fee', '0.00');//hardcoded this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Other Fee', '0.00');//hardcoded this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Project Fee', '0.00');//hardcoded this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Number of Months for which benefit is allotted', '10.00');//hardcoded this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Maintenance Allowance per month', '1350.00');//hardcoded this for now make it dynamic later there is no field in the db
    drawLabelAndValue('Total Maintenance Allowance', '13500.00');//hardcoded this for now make it dynamic later there is no field in the db

    y += 15;

    // --- Declaration ---
    addSectionTitle('Declaration');
    doc
      .font('Helvetica')
      .fontSize(11)
      .text(
      'I / We agree to the terms and conditions of this scholarship. All information given in this application is valid to best of my knowledge. I /We am /are punishable with penalties / punishments if any of the above mentioned details is false as per the Indian Penal Code, 199 and 200. The decision given by the competent authority will be final and will be accepted by me. If any surplus amount is received from the scholarship due to any reasons, then I / We will return the amount at the earliest. I / We will be responsible for taking action against me / my child against falsehood. I / We promise that we will take the scholarship / education fees as per the terms and conditions of the concerned scheme. All the documents that I have linked to the application have been received from the competent authority / authorities and the documents are valid and have been received by following the required legal procedures. There is no modification / correction / alteration performed on them. I hereby certify that the information provided is true and they are not false or fake. I am fully responsible for the false or fake surveillance of the attached documents, and I am fully aware that I will be entitled to the penalty imposed by the Indian Penal Code, 199 and 200',
      50,
      y,
      { width: 500 }
      );
    y = doc.y + 10;
    doc
      .font('Helvetica')
      .fontSize(11)
      .text('All information given in this application is true to the best of my knowledge.', 50, y);

    // Finalize PDF
    doc.end();
  });
}

module.exports = { createPDF };
