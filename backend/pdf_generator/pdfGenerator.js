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
    drawLabelAndValue('Scheme Name', userData.eligibleScheme1);
    drawLabelAndValue('Department Name', userData.departmentName);
    drawLabelAndValue('Applied Date', userData.applicationSubmissionDate);
    y += 15;

    // --- Personal Details ---
    addSectionTitle('Personal Details');
    drawLabelAndValue('Full Name', userData.candidateName);
    drawLabelAndValue('Mobile Number', userData.alternateMobileNumber);
    drawLabelAndValue('Email ID', userData.email);
    drawLabelAndValue('Date Of Birth', userData.dob);
    drawLabelAndValue('Gender', userData.gender);
    drawLabelAndValue('Religion', userData.religion);
    drawLabelAndValue('Marital Status', userData.maritalStatus);
    y += 15;

    // --- Permanent Address ---
    addSectionTitle('Permanent Address Details');
    drawLabelAndValue('Address', userData.correspondanceAddress);
    drawLabelAndValue('State', userData.correspondanceState);
    drawLabelAndValue('District', userData.correspondanceDistrict);
    drawLabelAndValue('Taluka', userData.correspondanceTaluka);
    drawLabelAndValue('Village', userData.correspondanceVillage);
    drawLabelAndValue('Pincode', userData.correspondancePincode);
    y += 15;

    // --- Correspondence Address ---
    addSectionTitle('Correspondence Address Details');
    drawLabelAndValue('Address', userData.correspondanceAddress);
    drawLabelAndValue('State', userData.correspondanceState);
    drawLabelAndValue('District', userData.correspondanceDistrict);
    drawLabelAndValue('Taluka', userData.correspondanceTaluka);
    drawLabelAndValue('Village', userData.correspondanceVillage);
    drawLabelAndValue('Pincode', userData.correspondancePincode);
    y += 15;

    // --- Income Details ---
    addSectionTitle('Income Details');
    drawLabelAndValue('Family Annual Income', userData.annualFamilyIncome);
    drawLabelAndValue('Income Certificate No', userData.incomeCertNo);
    drawLabelAndValue('Issuing Authority', userData.incomeIssAuthority);
    drawLabelAndValue('Date of Issue', userData.incomeIssuedDate);
    y += 15;

    // --- Domicile Details ---
    addSectionTitle('Domicile Details');
    drawLabelAndValue('Domicile Certificate No.', userData.domicileCertNumber);
    drawLabelAndValue('Issuing Authority', userData.domicileIssuedAuthority);
    drawLabelAndValue('Date of Issue', userData.domicileIssuedDate);
    y += 15;

    // --- Caste Details ---
    addSectionTitle('Caste Details');
    drawLabelAndValue('Caste Category', userData.casteCategory);
    drawLabelAndValue('Caste Certificate Number', userData.casteCertificateNumber);
    drawLabelAndValue('Issuing District', userData.casteIssuedDistrict);
    drawLabelAndValue('Issuing Authority', userData.casteIssAuthority);
    y += 15;

    // --- Parent/Guardian Details ---
    addSectionTitle('Parent/Guardian Details');
    drawLabelAndValue('Father Name', userData.fatherName);
    drawLabelAndValue('Mother Name', userData.motherName);
    y += 15;

    // --- Past Qualification Details (10th + 12th) ---
    addSectionTitle('Past Qualification Details');
    drawLabelAndValue('10th Board/University', userData.class10Board);
    drawLabelAndValue('10th Passing Year', userData.class10PassingYear);
    drawLabelAndValue('10th Percentage', userData.class10Percentage);
    drawLabelAndValue('12th Board/University', userData.class12Board);
    drawLabelAndValue('12th Passing Year', userData.class12PassingYear);
    drawLabelAndValue('12th Percentage', userData.class12Percentage);
    y += 15;

    // --- Current Course Details ---
    addSectionTitle('Current Course Details');
    drawLabelAndValue('Course Name', userData.courseName);
    drawLabelAndValue('Institute Name', userData.instituteName);
    drawLabelAndValue('Admission Year', userData.admissionYear);
    drawLabelAndValue('CAP ID', userData.admissionApplicationId);
    y += 15;

    // --- Hostel Details ---
    addSectionTitle('Hostel Details');
    drawLabelAndValue('Hostel Name', userData.hostelName);
    drawLabelAndValue('Hostel Type', userData.hostelType);
    drawLabelAndValue('Rent Per Month', userData.rentPerMonth);
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
