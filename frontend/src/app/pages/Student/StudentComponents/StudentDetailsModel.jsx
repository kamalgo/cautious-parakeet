import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { studentprofileviewApi } from "../../../api/Student/StudentApis";
// import { studentprofileviewApi } from "../../../api/Student/StudentApis";

function StudentDetailsModel({ id }) {
  const [formData, setFormData] = useState({});

  const handleChange = (param) => (event) => {
    setFormData({ ...formData, [param]: event.target.value });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getprofileviewFunction = () => {
    onOpen();
    // console.log("details", id);
    console.log("getprofileviewFunction called!!!");

    console.log("testMe clicked");

    let data = {
      id: id,
    };
    studentprofileviewApi(data)
      .then((res) => {
        console.log("res", res);
        setFormData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  // useEffect(() => {
  //   // console.log("details", id);
  //   let data = {
  //     name: "test",
  //   };
  //   studentprofileviewApi(data)
  //     .then((res) => {
  //       console.log("res", res);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  //   // getprofileviewFunction();
  // }, []);

  return (
    <>
      <Button onClick={""} variant={"ghost"}>
        {/* <Box marginRight={3} color="gray.500">
          <MdModeEdit size={"15"} />
        </Box> */}
        <Text fontSize="xs" onClick={getprofileviewFunction}>
          Show Details
        </Text>
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box p={5}>
            <form>
              <Box maxW="md" mx="auto" mt="8">
                <VStack spacing="4">
                  <FormControl id="id" display={"none"}>
                    <FormLabel>id</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your id"
                      value={formData.id}
                      onChange={handleChange("id")}
                    />
                  </FormControl>
                  <FormControl id="candidateName">
                    <FormLabel>candidate Name (As Per SSC Marksheet)</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your candidateName"
                      value={formData.candidateName}
                      onChange={handleChange("candidateName")}
                    />
                  </FormControl>

                  <FormControl id="email">
                    <FormLabel>email</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange("email")}
                    />
                  </FormControl>

                  <FormControl id="whatsappNumber">
                    <FormLabel>Mobile (Student WhatsApp Number)</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleChange("whatsappNumber")}
                    />
                  </FormControl>

                  <FormControl id="dob">
                    <FormLabel>Date of Birth (as per Aadhar)</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your dob"
                      value={formData.dob}
                      onChange={handleChange("dob")}
                    />
                  </FormControl>

                  <FormControl id="gender">
                    <FormLabel>Gender</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your gender"
                      value={formData.gender}
                      onChange={handleChange("gender")}
                    />
                  </FormControl>

                  <FormControl id="parentMobileNumber">
                    <FormLabel>Parent's/Guardian Mobile No</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your parentMobileNumber"
                      value={formData.parentMobileNumber}
                      onChange={handleChange("parentMobileNumber")}
                    />
                  </FormControl>

                  <FormControl id="maritalStatus">
                    <FormLabel>Marital Status</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange("maritalStatus")}
                    />
                  </FormControl>

                  <FormControl id="religion">
                    <FormLabel>Religion</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your religion"
                      value={formData.religion}
                      onChange={handleChange("religion")}
                    />
                  </FormControl>

                  <FormControl id="casteCategory">
                    <FormLabel>Caste Category</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your casteCategory"
                      value={formData.casteCategory}
                      onChange={handleChange("casteCategory")}
                    />
                  </FormControl>

                  <FormControl id="subCaste">
                    <FormLabel>Sub Caste</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your subCaste"
                      value={formData.subCaste}
                      onChange={handleChange("subCaste")}
                    />
                  </FormControl>

                  <FormControl id="doYouHaveCasteCertificate">
                    <FormLabel>Do you have Caste Certificate?</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your doYouHaveCasteCertificate"
                      value={formData.doYouHaveCasteCertificate}
                      onChange={handleChange("doYouHaveCasteCertificate")}
                    />
                  </FormControl>

                  <FormControl id="casteCertificateNumber">
                    <FormLabel>Caste Certificate Number</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your casteCertificateNumber"
                      value={formData.casteCertificateNumber}
                      onChange={handleChange("casteCertificateNumber")}
                    />
                  </FormControl>

                  <FormControl id="casteIssuedDistrict">
                    <FormLabel>Issuing District (Caste Certificate)</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your casteIssuedDistrict"
                      value={formData.casteIssuedDistrict}
                      onChange={handleChange("casteIssuedDistrict")}
                    />
                  </FormControl>

                  <FormControl id="casteApplicantName">
                    <FormLabel> Caste Applicant Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your casteApplicantName"
                      value={formData.casteApplicantName}
                      onChange={handleChange("casteApplicantName")}
                    />
                  </FormControl>

                  <FormControl id="casteIssuingAuthority">
                    <FormLabel> Caste Issuing Authority</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your Caste Issuing Authority"
                      value={formData.casteIssuingAuthority}
                      onChange={handleChange("casteIssuingAuthority")}
                    />
                  </FormControl>

                  <FormControl id="casteDoc">
                    <FormLabel> Caste Docs</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your Caste Docs"
                      value={formData.casteDoc}
                      onChange={handleChange("casteDoc")}
                    />
                  </FormControl>

                  <FormControl id="casteIssuedDate">
                    <FormLabel> Caste Issuing Date</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your Caste Issuing Date"
                      value={formData.casteIssuedDate}
                      onChange={handleChange("casteIssuedDate")}
                    />
                  </FormControl>

                  <FormControl id="annualFamilyIncome">
                    <FormLabel>Family Annual Income</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your Family Annual Income"
                      value={formData.annualFamilyIncome}
                      onChange={handleChange("annualFamilyIncome")}
                    />
                  </FormControl>

                  <FormControl id="doYouHaveIncomeCertificate">
                    <FormLabel>Do you have Income Certificate?</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your doYouHaveIncomeCertificate"
                      value={formData.doYouHaveIncomeCertificate}
                      onChange={handleChange("doYouHaveIncomeCertificate")}
                    />
                  </FormControl>

                  <FormControl id="incomeCertNo">
                    <FormLabel>Income Certificate Number</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your incomeCertNo"
                      value={formData.incomeCertNo}
                      onChange={handleChange("incomeCertNo")}
                    />
                  </FormControl>

                  <FormControl id="incomeIssAuthority">
                    <FormLabel>Income Certificate Issuing Authority</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your Income Issuing Authority"
                      value={formData.incomeIssAuthority}
                      onChange={handleChange("incomeIssAuthority")}
                    />
                  </FormControl>

                  <FormControl id="incomeDoc">
                    <FormLabel>Income Certificate Doc</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your Income income Doc"
                      value={formData.incomeDoc}
                      onChange={handleChange("incomeDoc")}
                    />
                  </FormControl>

                  <FormControl id="incomeIssuedDate">
                    <FormLabel>Income Certificate Issuing date</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your Income Date of Issue"
                      value={formData.incomeIssuedDate}
                      onChange={handleChange("incomeIssuedDate")}
                    />
                  </FormControl>

                  <FormControl id="doYouHaveDomicileMaharashtraKarnataka">
                    <FormLabel>
                      Are you Domicile of Maharashtra / Maharashtra-Karnataka
                      Border ?
                    </FormLabel>
                    <Input
                      type="text"
                      placeholder="Are you Domicile of Maharashtra / Maharashtra-Karnataka Border ?"
                      value={formData.doYouHaveDomicileMaharashtraKarnataka}
                      onChange={handleChange(
                        "doYouHaveDomicileMaharashtraKarnataka"
                      )}
                    />
                  </FormControl>

                  <FormControl id="doYouHaveDomicileCertificate">
                    <FormLabel>Do you have Domicile Certificate ?</FormLabel>
                    <Input
                      type="text"
                      placeholder="Do you have Domicile Certificate ?"
                      value={formData.doYouHaveDomicileCertificate}
                      onChange={handleChange("doYouHaveDomicileCertificate")}
                    />
                  </FormControl>

                  <FormControl id="domicileRelationType">
                    <FormLabel>Relationship Type (Domicile)</FormLabel>
                    <Input
                      type="text"
                      placeholder="Relationship Type"
                      value={formData.domicileRelationType}
                      onChange={handleChange("domicileRelationType")}
                    />
                  </FormControl>

                  <FormControl id="domicileCertNumber">
                    <FormLabel>Domicile Certificate No</FormLabel>
                    <Input
                      type="text"
                      placeholder="Domicile Certificate No"
                      value={formData.domicileCertNumber}
                      onChange={handleChange("domicileCertNumber")}
                    />
                  </FormControl>

                  <FormControl id="domicileApplicantName">
                    <FormLabel>Domicile Applicant Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Domicile Applicant Name"
                      value={formData.domicileApplicantName}
                      onChange={handleChange("domicileApplicantName")}
                    />
                  </FormControl>

                  <FormControl id="domicileIssuedAuthority">
                    <FormLabel>Domicile Issuing Authority</FormLabel>
                    <Input
                      type="text"
                      placeholder="Domicile Issuing Authority"
                      value={formData.domicileIssuedAuthority}
                      onChange={handleChange("domicileIssuedAuthority")}
                    />
                  </FormControl>

                  <FormControl id="domicileDoc">
                    <FormLabel>Domicile Doc</FormLabel>
                    <Input
                      type="text"
                      placeholder="Domicile Doc"
                      value={formData.domicileDoc}
                      onChange={handleChange("domicileDoc")}
                    />
                  </FormControl>

                  <FormControl id="domicileIssuedDate">
                    <FormLabel>Domicile Issued Date</FormLabel>
                    <Input
                      type="text"
                      placeholder="Domicile Issued Date"
                      value={formData.domicileIssuedDate}
                      onChange={handleChange("domicileIssuedDate")}
                    />
                  </FormControl>

                  <FormControl id="doYouHaveDisability">
                    <FormLabel>Do You Have Any Disability</FormLabel>
                    <Input
                      type="text"
                      placeholder="Disability of any Type?"
                      value={formData.doYouHaveDisability}
                      onChange={handleChange("doYouHaveDisability")}
                    />
                  </FormControl>

                  <FormControl id="disabilityType">
                    <FormLabel>Disability Type</FormLabel>
                    <Input
                      type="text"
                      placeholder="Disability Type"
                      value={formData.disabilityType}
                      onChange={handleChange("disabilityType")}
                    />
                  </FormControl>

                  <FormControl id="disabilityName">
                    <FormLabel>Person with Disability</FormLabel>
                    <Input
                      type="text"
                      placeholder="Person with Disability"
                      value={formData.disabilityName}
                      onChange={handleChange("disabilityName")}
                    />
                  </FormControl>

                  <FormControl id="doYouHaveDisabilityCertificate">
                    <FormLabel>Do you have Disability Certificate ?</FormLabel>
                    <Input
                      type="text"
                      placeholder="Do you have Disability Certificate ?"
                      value={formData.doYouHaveDisabilityCertificate}
                      onChange={handleChange("doYouHaveDisabilityCertificate")}
                    />
                  </FormControl>

                  <FormControl id="disabilityCertificateNo">
                    <FormLabel>Disability Certificate Number ?</FormLabel>
                    <Input
                      type="text"
                      placeholder="Disability Certificate Number ?"
                      value={formData.disabilityCertificateNo}
                      onChange={handleChange("disabilityCertificateNo")}
                    />
                  </FormControl>

                  <FormControl id="disabilityPercentage">
                    <FormLabel>
                      Disability Percentage (Should not less than 40%)
                    </FormLabel>
                    <Input
                      type="text"
                      placeholder="Disability Percentage (Should not less than 40%)"
                      value={formData.disabilityPercentage}
                      onChange={handleChange("disabilityPercentage")}
                    />
                  </FormControl>

                  <FormControl id="disabilityIssuedDate">
                    <FormLabel>Disability Issuing Date</FormLabel>
                    <Input
                      type="text"
                      placeholder="Disability Issuing Date"
                      value={formData.disabilityIssuedDate}
                      onChange={handleChange("disabilityIssuedDate")}
                    />
                  </FormControl>

                  <FormControl id="disabilityIssuingAuthority">
                    <FormLabel>Disability Issuing Authority</FormLabel>
                    <Input
                      type="text"
                      placeholder="Disability Issuing Authority"
                      value={formData.disabilityIssuingAuthority}
                      onChange={handleChange("disabilityIssuingAuthority")}
                    />
                  </FormControl>

                  <FormControl id="disabilityDoc">
                    <FormLabel>Disability Document</FormLabel>
                    <Input
                      type="text"
                      placeholder="Disability Document"
                      value={formData.disabilityDoc}
                      onChange={handleChange("disabilityDoc")}
                    />
                  </FormControl>

                  <FormControl id="bankaccName">
                    <FormLabel>Bank Account Number</FormLabel>
                    <Input
                      type="text"
                      placeholder="Bank Account Number"
                      value={formData.bankaccName}
                      onChange={handleChange("bankaccName")}
                    />
                  </FormControl>

                  <FormControl id="bankIfsc">
                    <FormLabel>Bank IFSC Code</FormLabel>
                    <Input
                      type="text"
                      placeholder="Bank IFSC Code"
                      value={formData.bankIfsc}
                      onChange={handleChange("bankIfsc")}
                    />
                  </FormControl>
                </VStack>
              </Box>
            </form>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}

export default StudentDetailsModel;
