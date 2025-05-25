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
    //age
    drawLabelAndValue('Religion', userData.religion);
    drawLabelAndValue('Marital Status', userData.maritalStatus);
    drawLabelAndValue('Name as per 10th certificate', userData.candidateName);
    drawLabelAndValue('Parent mobile number', userData.parentMobileNumber);

    //dependent type
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


    //is correspondence address same as permanent address
    y += 15;

    // --- Correspondence Address ---
    addSectionTitle('Correspondence Address Details');
    drawLabelAndValue('Address', userData.correspondanceAddress);
    drawLabelAndValue('State', userData.correspondanceState);
    drawLabelAndValue('District', userData.correspondanceDistrict);
    drawLabelAndValue('Taluka', userData.correspondanceTaluka);
    drawLabelAndValue('Village', userData.correspondanceVillage);
    drawLabelAndValue('Pincode', userData.correspondancePincode);
    //is correspondence address same as permanent address
    y += 15;

    // --- Income Details ---
    addSectionTitle('Income Details');
    drawLabelAndValue('Do you have income certificate ?', userData.doYouHaveIncomeCertificate);
    //does your certificate have a barcode ?
    drawLabelAndValue('Family Annual Income', userData.annualFamilyIncome);
    drawLabelAndValue('Income Certificate No', userData.incomeCertNo);
    drawLabelAndValue('Issuing Authority', userData.incomeIssAuthority);
    drawLabelAndValue('Date of Issue', userData.incomeIssuedDate);
    y += 15;

    // --- Domicile Details ---
    addSectionTitle('Domicile Details');
    //are you domicile of Maharashtra ?
    drawLabelAndValue('Do you have domicile certificate ?', userData.doYouHaveDomicileMaharashtraKarnataka);
    drawLabelAndValue('Domicle Relation type', userData.domicileRelationType);
    drawLabelAndValue('Domicile Certificate No.', userData.domicileCertNumber);
    //does your certificate have a barcode ?
    drawLabelAndValue('Applicant name', userData.domicileApplicantName);
    drawLabelAndValue('Issuing Authority', userData.domicileIssuedAuthority);
    drawLabelAndValue('Date of Issue', userData.domicileIssuedDate);
    y += 15;

    // --- Personal Eligibility Details ---
    //are you salaried ?
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
    //Completed
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
    //is gap year ?

    addSectionTitle('Past Qualification Details 10th');
    // --- Past Qualification Details 10th ---
    drawLabelAndValue('Qualification level', userData.class10Qualification);
    drawLabelAndValue('Stream', userData.class10Stream);
    //Completed
    drawLabelAndValue('Institute state', userData.class10State);
    drawLabelAndValue('Institute district', userData.class10District);
    drawLabelAndValue('Institute taluka', userData.class10Taluka);
    drawLabelAndValue('Course name', userData.class10Course);
    drawLabelAndValue('Board/University', userData.class10Board);
    drawLabelAndValue('Mode', userData.class10Mode);
    drawLabelAndValue('Admission year', userData.class10AdmissionYear);
    drawLabelAndValue('10th Passing Year', userData.class10PassingYear);
    drawLabelAndValue('Result', userData.class10Result);
    drawLabelAndValue('10th Percentage', userData.class10Percentage);
    drawLabelAndValue('Attempts', userData.class10Attempt);
    drawLabelAndValue('10th Board/University', userData.class10Board);
    //is gap year ?
    y += 15;

    // --- Current Course Details ---
    addSectionTitle('Current Course Details');
    //admission in current course
    drawLabelAndValue('Institute state', userData.instituteState);
    drawLabelAndValue('Institute district', userData.instituteDistrict);
    drawLabelAndValue('Institute taluka', userData.instituteTaluka);
    drawLabelAndValue('Qualification level', userData.qualificationLevel);
    drawLabelAndValue('Course stream', userData.courseStream);
    drawLabelAndValue('College Name/School Name', userData.instituteName);
    drawLabelAndValue('Course Name', userData.courseName);
    drawLabelAndValue('Admission type', userData.admissionType);
    drawLabelAndValue('Year of study', userData.currentYear);
    drawLabelAndValue('Completed or pursuig', userData.isCompletedPursuing);
    drawLabelAndValue('Admission date', userData.admissionDate);
    drawLabelAndValue('Admission Year', userData.admissionYear);
    drawLabelAndValue('Fees paid', userData.feesPaid);
    //course type
    drawLabelAndValue('Admission through open or reserved category', userData.admissionCategory);
    //gap year
    drawLabelAndValue('Mode', userData.modeStudy);
    drawLabelAndValue('Application Admission ID/CAP ID/CLAT Admit Card No', userData.admissionApplicationId);
    y += 15;

    // --- Hostel Details ---
    addSectionTitle('Hostel Details');
    drawLabelAndValue('Hosteller/Day Scholar', userData.areYouHostellerDayScholar);
    drawLabelAndValue('Hostel Type', userData.hostelType);
    drawLabelAndValue('Hostel Name', userData.hostelName);
    drawLabelAndValue('Hostel address', userData.hostelAddress);
    drawLabelAndValue('Is mess available ?', userData.messAvailable);
    drawLabelAndValue('Rent Per Month', userData.rentPerMonth);
    drawLabelAndValue('Hostel state', userData.hostelState);
    drawLabelAndValue('Hostel district', userData.hostelDistrict);
    y += 15;

    // --- Caste Details ---
    addSectionTitle('Caste Details');
    drawLabelAndValue('Caste Category', userData.casteCategory);
    drawLabelAndValue('Caste Certificate Number', userData.casteCertificateNumber);
    drawLabelAndValue('Issuing District', userData.casteIssuedDistrict);
    drawLabelAndValue('Issuing Authority', userData.casteIssAuthority);
    y += 15;

    // --- Fee Details ---
    addSectionTitle('Fee Details');
    drawLabelAndValue('Tuition Fee', userData.feesPaid);
    drawLabelAndValue('Development Fee', "-");
    drawLabelAndValue('Exam Fee', "-");
    y += 15;

    // --- Scholarship Benefits ---
    addSectionTitle('Scholarship Benefits');
    drawLabelAndValue('Maintenance Allowance Per Month', "-");
    drawLabelAndValue('Total Maintenance Allowance', "-");
    y += 15;

    // --- Declaration ---
    addSectionTitle('Declaration');
    doc
      .font('Helvetica')
      .fontSize(11)
      .text('I/We agree to the terms and conditions of this scholarship.', 50, y);
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
