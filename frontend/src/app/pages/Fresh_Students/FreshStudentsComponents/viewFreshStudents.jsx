// import React from 'react'

// const viewFreshStudents = () => {
//   return (
//     <div>viewFreshStudents</div>
//   )
// }

// export default viewFreshStudents

import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Base from "../../../components/Base";
import { studentprofileviewApi } from "../../../api/Student/StudentApis";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Heading, SimpleGrid, Link, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons"; // Import ExternalLinkIcon from Chakra UI

// import Edit_Prsnl_Info_Modal from "./Edit_Prsnl_Info_Modal";
// import Upload_Document_Modal from "./Upload_Document_Modal";

function viewFreshStudents() {

  //modal for edit personal 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [viewData, setViewData] = useState([]);
  
  //modal for upload
  const [isModalOpenUpload,setisModalOpenUpload] = useState(false);


  const location = useLocation();

  const { id } = useParams();
  console.log("my id", id);

//   console.log(location.state?.id);
  
//   if (!location.state?.id) {
//     return <div>No data</div>;
//   }

  const getprofileviewFunction = () => {
    console.log("getprofileviewFunction called!!!");
    let data = {
      id: id,
    };
    studentprofileviewApi(data)
      .then((res) => {
        console.log("Student profile view data:", res.data);
        setViewData(res.data);
      })
      .catch((err) => {
        console.log("Error fetching student profile view data:", err);
      });
  };

  useEffect(() => {
    getprofileviewFunction();
  }, []);

  console.log("viewData", viewData.admissionType);

  const openModalWithId = () => {
    setSelectedId(location.state.id);
    setIsModalOpen(true);
  };

  const handlesetisModalOpenUpload = () => {
    console.log("intel inside");
    setisModalOpenUpload(true);
  };

  console.log("Selected ID:", selectedId);


  return (
    <div>
      <Base>
      <button
  ml="1600px"
  p="5px 10px"
  fontSize="14px"
  colorScheme="blue"
  onClick={() => {
    console.log("yo");
    handlesetisModalOpenUpload();
    // openModalWithId();
  }}
>
  Upload Documents
</button>

        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Heading as="h2" size="md" p={"20px"}>
                    Personal Information
                  </Heading>
                </Box>
                <button
  style={{
    marginLeft: "auto",
    padding: "5px 10px",
    fontSize: "14px",
    backgroundColor: "#3182CE",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
    zIndex: 2,
  }}
  onClick={(e) => {
    e.stopPropagation();
    openModalWithId();
  }}
>
{/* <NavLink
                  to={{
                // pathname: "/dashboard/admin/student/view",
                // state: { id: record.id },
              }}
                    onClick={(e) => e.stopPropagation()}
                  >

                  </NavLink>   */}
                  Edit
</button>

                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    candidate Name (As Per SSC Marksheet)
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.candidateName === null
                      ? "NA"
                      : viewData?.candidateName}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Email
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.email === null ? "NA" : viewData?.email}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Mobile (Student WhatsApp Number)
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.whatsappNumber === null
                      ? "NA"
                      : viewData?.whatsappNumber}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Date of Birth (as per Aadhar)
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.dob === null ? "NA" : viewData?.dob}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Gender
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.dob === null ? "NA" : viewData?.dob}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Parent's/Guardian Mobile No
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.parentMobileNumber === null
                      ? "NA"
                      : viewData?.parentMobileNumber}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Marital Status
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.maritalStatus === null
                      ? "NA"
                      : viewData?.maritalStatus}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Religion
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.religion === null ? "NA" : viewData?.religion}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Caste Category
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.casteCategory === null
                      ? "NA"
                      : viewData?.casteCategory}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Sub Caste
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.subCaste === null ? "NA" : viewData?.subCaste}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Do you have Caste Certificate?
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.doYouHaveCasteCertificate === null
                      ? "NA"
                      : viewData?.doYouHaveCasteCertificate}
                  </Text>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Caste Certificate Number
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.casteCertificateNumber === null
                      ? "NA"
                      : viewData?.casteCertificateNumber}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Issuing District (Caste Certificate)
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.casteIssuedDistrict === null
                      ? "NA"
                      : viewData?.casteIssuedDistrict}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Caste Applicant Name
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.casteApplicantName === null
                      ? "NA"
                      : viewData?.casteApplicantName}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Caste Issuing Authority
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.casteIssuingAuthority === null
                      ? "NA"
                      : viewData?.casteIssuingAuthority}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Caste Docs
                  </Heading>
                  <Text fontSize="md">
                    <Link
                      href={
                        viewData?.casteDoc === null ? "NA" : viewData?.casteDoc
                      }
                      isExternal
                    >
                      Click! <ExternalLinkIcon mx="2px" />
                    </Link>
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Caste Issuing Date
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.casteIssuedDate === null
                      ? "NA"
                      : viewData?.casteIssuedDate}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Family Annual Income
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.annualFamilyIncome === null
                      ? "NA"
                      : viewData?.annualFamilyIncome}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Do you have Income Certificate?
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.doYouHaveIncomeCertificate === null
                      ? "NA"
                      : viewData?.doYouHaveIncomeCertificate}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Income Certificate Number
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.incomeCertNo === null
                      ? "NA"
                      : viewData?.incomeCertNo}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Income Certificate Issuing Authority
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.incomeIssAuthority === null
                      ? "NA"
                      : viewData?.incomeIssAuthority}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Income Certificate Doc
                  </Heading>

                  <Link
                    href={
                      viewData?.incomeDoc === null ? "NA" : viewData?.incomeDoc
                    }
                    isExternal
                  >
                    Click! <ExternalLinkIcon mx="2px" />
                  </Link>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Income Certificate Issuing date
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.incomeIssuedDate === null
                      ? "NA"
                      : viewData?.incomeIssuedDate}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Are you Domicile of Maharashtra / Maharashtra-Karnataka
                    Border ?
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.doYouHaveDomicileMaharashtraKarnataka === null
                      ? "NA"
                      : viewData?.doYouHaveDomicileMaharashtraKarnataka}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Do you have Domicile Certificate ?
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.doYouHaveDomicileCertificate === null
                      ? "NA"
                      : viewData?.doYouHaveDomicileCertificate}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Relationship Type (Domicile)
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.domicileRelationType === null
                      ? "NA"
                      : viewData?.domicileRelationType}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Domicile Certificate No
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.domicileCertNumber === null
                      ? "NA"
                      : viewData?.domicileCertNumber}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Domicile Applicant Name
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.domicileApplicantName === null
                      ? "NA"
                      : viewData?.domicileApplicantName}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Domicile Issuing Authority
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.domicileIssuedAuthority === null
                      ? "NA"
                      : viewData?.domicileIssuedAuthority}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Domicile Doc
                  </Heading>
                  <Link
                    href={
                      viewData?.domicileDoc === null
                        ? "NA"
                        : viewData?.domicileDoc
                    }
                    isExternal
                  >
                    Click! <ExternalLinkIcon mx="2px" />
                  </Link>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Domicile Issued Date
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.domicileIssuedDate === null
                      ? "NA"
                      : viewData?.domicileIssuedDate}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Do You Have Any Disability
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.doYouHaveDisability === null
                      ? "NA"
                      : viewData?.doYouHaveDisability}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Disability Type
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.disabilityType === null
                      ? "NA"
                      : viewData?.disabilityType}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Person with Disability
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.disabilityName === null
                      ? "NA"
                      : viewData?.disabilityName}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Do you have Disability Certificate ?
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.doYouHaveDisabilityCertificate === null
                      ? "NA"
                      : viewData?.doYouHaveDisabilityCertificate}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Disability Certificate Number ?
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.disabilityCertificateNo === null
                      ? "NA"
                      : viewData?.disabilityCertificateNo}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Disability Percentage (Should not less than 40%)
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.disabilityPercentage === null
                      ? "NA"
                      : viewData?.disabilityPercentage}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Disability Issuing Date
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.disabilityIssuedDate === null
                      ? "NA"
                      : viewData?.disabilityIssuedDate}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Disability Issuing Authority
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.disabilityIssuingAuthority === null
                      ? "NA"
                      : viewData?.disabilityIssuingAuthority}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Disability Document
                  </Heading>
                  <Link
                    href={
                      viewData?.disabilityDoc === null
                        ? "NA"
                        : viewData?.disabilityDoc
                    }
                    isExternal
                  >
                    Click! <ExternalLinkIcon mx="2px" />
                  </Link>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Bank Account Number
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.bankaccName === null
                      ? "NA"
                      : viewData?.bankaccName}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Bank IFSC Code
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.bankIfsc === null ? "NA" : viewData?.bankIfsc}
                  </Text>
                </Box>
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Heading as="h2" size="md" p={"20px"}>
                    Address Information
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Enter your permanent Village
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.permanentVillage === null
                      ? "NA"
                      : viewData?.permanentVillage}
                  </Text>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Is Correspondence Address same as Permanent Address?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.correspoAddressSameAsPermanent === null
                      ? "NA"
                      : viewData?.correspoAddressSameAsPermanent}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Enter your Correspondance Address District
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.correspondanceDistrict === null
                      ? "NA"
                      : viewData?.correspondanceDistrict}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Enter your correspondance Address Taluka
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.correspondanceTaluka === null
                      ? "NA"
                      : viewData?.correspondanceTaluka}
                  </Text>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Enter your correspondance Address
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.correspondanceAddress === null
                      ? "NA"
                      : viewData?.correspondanceAddress}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Enter your correspondance Address State
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.correspondanceState === null
                      ? "NA"
                      : viewData?.correspondanceState}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Enter your correspondance Address Village
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.correspondanceVillage === null
                      ? "NA"
                      : viewData?.correspondanceVillage}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Enter your correspondance Address Pin code
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.correspondancePincode === null
                      ? "NA"
                      : viewData?.correspondancePincode}
                  </Text>
                </Box>
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Heading as="h2" size="md" p={"20px"}>
                    Other Information
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Is Father Alive?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.isFatherAlive === null
                      ? "NA"
                      : viewData?.isFatherAlive}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Father Name
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.fatherName === null
                      ? "NA"
                      : viewData?.fatherName}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Father Occupation
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.occu_name === null ? "NA" : viewData?.occu_name}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Father Is Salaried?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.fatherSalaried === null
                      ? "NA"
                      : viewData?.fatherSalaried}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Is Mother Alive?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.motherAlive === null
                      ? "NA"
                      : viewData?.motherAlive}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Mother Name
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.motherName === null
                      ? "NA"
                      : viewData?.motherName}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Mother Occupation
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.motherOccupation === null
                      ? "NA"
                      : viewData?.motherOccupation}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Is Mother Salaried
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.isMotherSalaried === null
                      ? "NA"
                      : viewData?.isMotherSalaried}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Guardian Name
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.guardianName === null
                      ? "NA"
                      : viewData?.guardianName}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Guardian Address
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.guardianAddress === null
                      ? "NA"
                      : viewData?.guardianAddress}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Guardian Occupation
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.guardianOccupation === null
                      ? "NA"
                      : viewData?.guardianOccupation}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Is Guardian Salaried
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.isGuardianSalaried === null
                      ? "NA"
                      : viewData?.isGuardianSalaried}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Relation Type
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.guardianRelationType === null
                      ? "NA"
                      : viewData?.guardianRelationType}
                  </Text>
                </Box>
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Heading as="h2" size="md" p={"20px"}>
                    Current Course
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Admission Year In Current Course
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.admissionYear === null
                      ? "NA"
                      : viewData?.admissionYear}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Institute State
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.instituteState === null
                      ? "NA"
                      : viewData?.instituteState}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Institute District
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.instituteDistrict === null
                      ? "NA"
                      : viewData?.instituteDistrict}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Institute Taluka
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.instituteTaluka === null
                      ? "NA"
                      : viewData?.instituteTaluka}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Qualification Level
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.qualificationLevel === null
                      ? "NA"
                      : viewData?.qualificationLevel}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Course Stream
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.courseStream === null
                      ? "NA"
                      : viewData?.courseStream}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Institute Name
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.instituteName === null
                      ? "NA"
                      : viewData?.instituteName}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Course name
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.coursename === null
                      ? "NA"
                      : viewData?.coursename}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Admission Type
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.admissionType === null
                      ? "NA"
                      : viewData?.admissionType}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    CET / JEE Percentage
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.cetPercentAge === null
                      ? "NA"
                      : viewData?.cetPercentAge}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Application Admission ID/CAP ID/CLAT Admit Card No
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.admissionApplicationId === null
                      ? "NA"
                      : viewData?.admissionApplicationId}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Admission Letter Doc
                  </Heading>

                  <Link
                    href={
                      viewData?.admissionLetterDoc === null
                        ? "NA"
                        : viewData?.admissionLetterDoc
                    }
                    isExternal
                  >
                    Click! <ExternalLinkIcon mx="2px" />
                  </Link>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Year Of Study
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.currentYear === null
                      ? "NA"
                      : viewData?.currentYear}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Year Of Study Completed Or Pursuing
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.isCompletedPursuing === null
                      ? "NA"
                      : viewData?.isCompletedPursuing}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Admission Date
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.admissionDate === null
                      ? "NA"
                      : viewData?.admissionDate}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Fees Paid
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.feesPaid === null ? "NA" : viewData?.feesPaid}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Upload Fees/Admission Receipt/bonafide certificate
                  </Heading>

                  <Link
                    href={
                      viewData?.feeReceiptDoc === null
                        ? "NA"
                        : viewData?.feeReceiptDoc
                    }
                    isExternal
                  >
                    Click! <ExternalLinkIcon mx="2px" />
                  </Link>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Upload Fees/Admission Receipt/bonafide certificate
                  </Heading>

                  <Link
                    href={
                      viewData?.feeReceiptDoc === null
                        ? "NA"
                        : viewData?.feeReceiptDoc
                    }
                    isExternal
                  >
                    Click! <ExternalLinkIcon mx="2px" />
                  </Link>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Is Admission Through Open Or Reserved Category ?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.admissionCategory === null
                      ? "NA"
                      : viewData?.admissionCategory}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Mode Of Study
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.modeStudy === null ? "NA" : viewData?.modeStudy}
                  </Text>
                </Box>
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Heading as="h2" size="md" p={"20px"}>
                    Past Qualification
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 10th Qualification Level
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class10Qualification === null
                      ? "NA"
                      : viewData?.class10Qualification}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 10th Stream
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class10Stream === null
                      ? "NA"
                      : viewData?.class10Stream}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 10th State
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class10State === null
                      ? "NA"
                      : viewData?.class10State}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 10th District
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class10District === null
                      ? "NA"
                      : viewData?.class10District}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 10th Taluka
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class10Taluka === null
                      ? "NA"
                      : viewData?.class10Taluka}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 10th Course
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class10Course === null
                      ? "NA"
                      : viewData?.class10Course}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 10th Board
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class10Board === null
                      ? "NA"
                      : viewData?.class10Board}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 10th Mode
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class10Mode === null
                      ? "NA"
                      : viewData?.class10Mode}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 10th Doc
                  </Heading>
                  <Link
                    href={
                      viewData?.class10Doc === null
                        ? "NA"
                        : viewData?.class10Doc
                    }
                    isExternal
                  >
                    Click! <ExternalLinkIcon mx="2px" />
                  </Link>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 10th Passing Year
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class10PassingYear === null
                      ? "NA"
                      : viewData?.class10PassingYear}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 10th Result
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class10Result === null
                      ? "NA"
                      : viewData?.class10Result}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 10th Percentage
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class10Percentage === null
                      ? "NA"
                      : viewData?.class10Percentage}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 10th Attempt
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class10Attempt === null
                      ? "NA"
                      : viewData?.class10Attempt}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 10th Seat Number
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class10SeatNumber === null
                      ? "NA"
                      : viewData?.class10SeatNumber}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 10th Month Of Exam
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class10MonthOfExam === null
                      ? "NA"
                      : viewData?.class10MonthOfExam}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 10th Marks Obtained
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class10MarksObtained === null
                      ? "NA"
                      : viewData?.class10MarksObtained}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 10th Attempts
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class10Attempts === null
                      ? "NA"
                      : viewData?.class10Attempts}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 12th Qualification Level
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class12QualificationLevel === null
                      ? "NA"
                      : viewData?.class12QualificationLevel}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 12th Stream
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class12Stream === null
                      ? "NA"
                      : viewData?.class12Stream}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 12th Institute State
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class12InstituteState === null
                      ? "NA"
                      : viewData?.class12InstituteState}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 12th Institute District
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class12InstituteDistrict === null
                      ? "NA"
                      : viewData?.class12InstituteDistrict}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 12th Institute Taluka
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class12Taluka === null
                      ? "NA"
                      : viewData?.class12Taluka}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 12th Collage Name
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class12CollegeName === null
                      ? "NA"
                      : viewData?.class12CollegeName}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 12th Course
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class12Course === null
                      ? "NA"
                      : viewData?.class12Course}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 12th Board
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class12Board === null
                      ? "NA"
                      : viewData?.class12Board}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 12th Seat Number
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class12SeatNumber === null
                      ? "NA"
                      : viewData?.class12SeatNumber}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 12th Mode
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class12Mode === null
                      ? "NA"
                      : viewData?.class12Mode}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 12th Admission Year
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class12AdmissionYear === null
                      ? "NA"
                      : viewData?.class12AdmissionYear}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 12th Passing Year
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class12PassingYear === null
                      ? "NA"
                      : viewData?.class12PassingYear}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 12th Result
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class12Result === null
                      ? "NA"
                      : viewData?.class12Result}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 12th Percentage
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class12Percentage === null
                      ? "NA"
                      : viewData?.class12Percentage}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 12th Attempts
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.class12Attempts === null
                      ? "NA"
                      : viewData?.class12Attempts}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 12th Docs
                  </Heading>

                  <Link
                    href={
                      viewData?.class12Doc === null
                        ? "NA"
                        : viewData?.class12Doc
                    }
                    isExternal
                  >
                    Click! <ExternalLinkIcon mx="2px" />
                  </Link>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Do You Have Gap
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.doYouHaveGap === null
                      ? "NA"
                      : viewData?.doYouHaveGap}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Gap Document
                  </Heading>
                  <Link
                    href={viewData?.gapDoc === null ? "NA" : viewData?.gapDoc}
                    isExternal
                  >
                    Click! <ExternalLinkIcon mx="2px" />
                  </Link>
                </Box>
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Heading as="h2" size="md" p={"20px"}>
                    Hostel Details
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Are you a Hosteller or Day Scholar
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.areYouHostellerDayScholar === null
                      ? "NA"
                      : viewData?.areYouHostellerDayScholar}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Hostel State
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.hostelState === null
                      ? "NA"
                      : viewData?.hostelState}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Hostel District
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.hostelDistrict === null
                      ? "NA"
                      : viewData?.hostelDistrict}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Hostel Taluka
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.hostelTaluka === null
                      ? "NA"
                      : viewData?.hostelTaluka}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Hostel Type
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.hostelType === null
                      ? "NA"
                      : viewData?.hostelType}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Hostel/ P.G/Rented House Name
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.hostelName === null
                      ? "NA"
                      : viewData?.hostelName}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Hostel/ P.G/Rented House Address
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.hostelAddress === null
                      ? "NA"
                      : viewData?.hostelAddress}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Hostel Pin Code
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.hostelPincode === null
                      ? "NA"
                      : viewData?.hostelPincode}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Hostel Admission Date
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.hostelAdmissionDate === null
                      ? "NA"
                      : viewData?.hostelAdmissionDate}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Hostel Docs
                  </Heading>

                  <Link
                    href={
                      viewData?.hostelDoc === null ? "NA" : viewData?.hostelDoc
                    }
                    isExternal
                  >
                    Click! <ExternalLinkIcon mx="2px" />
                  </Link>
                </Box>
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        {/* <Edit_Prsnl_Info_Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} id={selectedId} /> */}
        {/* <Upload_Document_Modal isOpen={isModalOpenUpload} onClose={() => setisModalOpenUpload(false)}  /> */}

      </Base>
    </div>
  );
}

export default viewFreshStudents;