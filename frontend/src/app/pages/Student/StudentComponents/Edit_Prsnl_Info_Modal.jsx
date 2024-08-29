import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
} from '@chakra-ui/react';

import { editStudentApi } from '../../../api/Student/StudentApis';

const Edit_Prsnl_Info_Modal = ({ isOpen, onClose, id  }) => {
  
  console.log("Edit_Prsnl_Info_Modal : id", id);


  const [formData, setFormData] = useState({
    namee: '',
    email: '',
    mobile: '',
    dob: '',
    gender: '',
    parentMobile: '',
    maritalStatus: '',
    religion: '',
    casteCategory: '',
    subCaste: '',
    casteCertificate: false,
    casteCertificateNumber: '',
    issuingDistrict: '',
    casteApplicantName: '',
    casteIssuingAuthority: '',
    familyIncome: '',
    incomeCertificate: false,
    incomeCertificateNumber: '',
    incomeIssuingAuthority: '',
    domicileMaharashtra: false,
    domicileCertificate: false,
    relationshipType: '',
    domicileCertificateNumber: '',
    domicileApplicantName: '',
    domicileIssuingAuthority: '',
    disability: false,
    disabilityType: '',
    personWithDisability: '',
    disabilityCertificate: false,
    disabilityCertificateNumber: '',
    disabilityPercentage: '',
    disabilityIssuingDate: '',
    disabilityIssuingAuthority: '',
    bankAccount: '',
    bankIfsc: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({id:id,
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = async () => {
    console.log("Data to be saved:", formData); // Check console for data being sent
    
    try {
      const response = await editStudentApi(formData);
      console.log("Response from server:", response); // Log response for debugging
      
      if (response.success) {
        toast({
          title: "Success",
          description: response.message || "Personal information updated successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Error",
          description: response.message || "An error occurred while updating personal information.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error adding personal information:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating personal information.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  

  // const handleSave = async () => {

  //   console.log(formData);

  //   try {
  //     const response = await editStudentApi(formData);
  //     if (response.success) {
  //       toast({
  //         title: "Success",
  //         description: response.message || "Tranch data added successfully!",
  //         status: "success",
  //         duration: 5000,
  //         isClosable: true,
  //         position: "top-right",
  //       });
  //     } else {
  //       toast({
  //         title: "Error",
  //         description: response.message || "An error occurred while adding tranch data.",
  //         status: "error",
  //         duration: 5000,
  //         isClosable: true,
  //         position: "top-right",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error adding tranch data:", error);
  //     toast({
  //       title: "Error",
  //       description: "An error occurred while adding tranch data.",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "top-right",
  //     });
  //   }

  // };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Personal Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="namee" mb={4}>
            <FormLabel>Candidate Name (As Per SSC Marksheet)</FormLabel>
            <Input name="namee" value={formData.namee} onChange={handleChange} />
          </FormControl>

          <FormControl id="email" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" value={formData.email} onChange={handleChange} />
          </FormControl>

          <FormControl id="mobile" mb={4}>
            <FormLabel>Mobile (Student WhatsApp Number)</FormLabel>
            <Input name="mobile" type="tel" value={formData.mobile} onChange={handleChange} />
          </FormControl>

          <FormControl id="dob" mb={4}>
            <FormLabel>Date of Birth (as per Aadhar)</FormLabel>
            <Input name="dob" type="date" value={formData.dob} onChange={handleChange} />
          </FormControl>

          <FormControl id="gender" mb={4}>
            <FormLabel>Gender</FormLabel>
            <Select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>

          <FormControl id="parentMobile" mb={4}>
            <FormLabel>Parent's/Guardian Mobile No</FormLabel>
            <Input name="parentMobile" type="tel" value={formData.parentMobile} onChange={handleChange} />
          </FormControl>

          <FormControl id="maritalStatus" mb={4}>
            <FormLabel>Marital Status</FormLabel>
            <Select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
              <option value="unmarried">Unmarried</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
            </Select>
          </FormControl>

          <FormControl id="religion" mb={4}>
            <FormLabel>Religion</FormLabel>
            <Input name="religion" value={formData.religion} onChange={handleChange} />
          </FormControl>

          <FormControl id="casteCategory" mb={4}>
            <FormLabel>Caste Category</FormLabel>
            <Select name="casteCategory" value={formData.casteCategory} onChange={handleChange}>
              <option value="general">General</option>
              <option value="sc">SC</option>
              <option value="st">ST</option>
              <option value="obc">OBC</option>
            </Select>
          </FormControl>

          <FormControl id="subCaste" mb={4}>
            <FormLabel>Sub Caste</FormLabel>
            <Input name="subCaste" value={formData.subCaste} onChange={handleChange} />
          </FormControl>

          <FormControl id="casteCertificate" mb={4}>
            <FormLabel>Do you have Caste Certificate?</FormLabel>
            <Checkbox name="casteCertificate" isChecked={formData.casteCertificate} onChange={handleChange}>
              Yes
            </Checkbox>
          </FormControl>

          <FormControl id="casteCertificateNumber" mb={4}>
            <FormLabel>Caste Certificate Number</FormLabel>
            <Input
              name="casteCertificateNumber"
              value={formData.casteCertificateNumber}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="issuingDistrict" mb={4}>
            <FormLabel>Issuing District (Caste Certificate)</FormLabel>
            <Input name="issuingDistrict" value={formData.issuingDistrict} onChange={handleChange} />
          </FormControl>

          <FormControl id="casteApplicantName" mb={4}>
            <FormLabel>Caste Applicant Name</FormLabel>
            <Input name="casteApplicantName" value={formData.casteApplicantName} onChange={handleChange} />
          </FormControl>

          <FormControl id="casteIssuingAuthority" mb={4}>
            <FormLabel>Caste Issuing Authority</FormLabel>
            <Input name="casteIssuingAuthority" value={formData.casteIssuingAuthority} onChange={handleChange} />
          </FormControl>

          <FormControl id="familyIncome" mb={4}>
            <FormLabel>Family Annual Income</FormLabel>
            <Input name="familyIncome" type="number" value={formData.familyIncome} onChange={handleChange} />
          </FormControl>

          <FormControl id="incomeCertificate" mb={4}>
            <FormLabel>Do you have Income Certificate?</FormLabel>
            <Checkbox name="incomeCertificate" isChecked={formData.incomeCertificate} onChange={handleChange}>
              Yes
            </Checkbox>
          </FormControl>

          <FormControl id="incomeCertificateNumber" mb={4}>
            <FormLabel>Income Certificate Number</FormLabel>
            <Input name="incomeCertificateNumber" value={formData.incomeCertificateNumber} onChange={handleChange} />
          </FormControl>

          <FormControl id="incomeIssuingAuthority" mb={4}>
            <FormLabel>Income Certificate Issuing Authority</FormLabel>
            <Input name="incomeIssuingAuthority" value={formData.incomeIssuingAuthority} onChange={handleChange} />
          </FormControl>

          <FormControl id="domicileMaharashtra" mb={4}>
            <FormLabel>Are you Domicile of Maharashtra / Maharashtra-Karnataka Border?</FormLabel>
            <Checkbox name="domicileMaharashtra" isChecked={formData.domicileMaharashtra} onChange={handleChange}>
              Yes
            </Checkbox>
          </FormControl>

          <FormControl id="domicileCertificate" mb={4}>
            <FormLabel>Do you have Domicile Certificate?</FormLabel>
            <Checkbox name="domicileCertificate" isChecked={formData.domicileCertificate} onChange={handleChange}>
              Yes
            </Checkbox>
          </FormControl>

          <FormControl id="relationshipType" mb={4}>
            <FormLabel>Relationship Type (Domicile)</FormLabel>
            <Input name="relationshipType" value={formData.relationshipType} onChange={handleChange} />
          </FormControl>

          <FormControl id="domicileCertificateNumber" mb={4}>
            <FormLabel>Domicile Certificate No</FormLabel>
            <Input name="domicileCertificateNumber" value={formData.domicileCertificateNumber} onChange={handleChange} />
          </FormControl>

          <FormControl id="domicileApplicantName" mb={4}>
            <FormLabel>Domicile Applicant Name</FormLabel>
            <Input name="domicileApplicantName" value={formData.domicileApplicantName} onChange={handleChange} />
          </FormControl>

          <FormControl id="domicileIssuingAuthority" mb={4}>
            <FormLabel>Domicile Issuing Authority</FormLabel>
            <Input name="domicileIssuingAuthority" value={formData.domicileIssuingAuthority} onChange={handleChange} />
          </FormControl>

          <FormControl id="disability" mb={4}>
            <FormLabel>Do You Have Any Disability</FormLabel>
            <Checkbox name="disability" isChecked={formData.disability} onChange={handleChange}>
              Yes
            </Checkbox>
          </FormControl>

          <FormControl id="disabilityType" mb={4}>
            <FormLabel>Disability Type</FormLabel>
            <Input name="disabilityType" value={formData.disabilityType} onChange={handleChange} />
          </FormControl>

          <FormControl id="personWithDisability" mb={4}>
            <FormLabel>Person with Disability</FormLabel>
            <Input name="personWithDisability" value={formData.personWithDisability} onChange={handleChange} />
          </FormControl>

          <FormControl id="disabilityCertificate" mb={4}>
            <FormLabel>Do you have Disability Certificate?</FormLabel>
            <Checkbox name="disabilityCertificate" isChecked={formData.disabilityCertificate} onChange={handleChange}>
              Yes
            </Checkbox>
          </FormControl>

          <FormControl id="disabilityCertificateNumber" mb={4}>
            <FormLabel>Disability Certificate Number</FormLabel>
            <Input name="disabilityCertificateNumber" value={formData.disabilityCertificateNumber} onChange={handleChange} />
          </FormControl>

          <FormControl id="disabilityPercentage" mb={4}>
            <FormLabel>Disability Percentage (Should not less than 40%)</FormLabel>
            <Input name="disabilityPercentage" type="number" value={formData.disabilityPercentage} onChange={handleChange} />
          </FormControl>

          <FormControl id="disabilityIssuingDate" mb={4}>
            <FormLabel>Disability Issuing Date</FormLabel>
            <Input name="disabilityIssuingDate" type="date" value={formData.disabilityIssuingDate} onChange={handleChange} />
          </FormControl>

          <FormControl id="disabilityIssuingAuthority" mb={4}>
            <FormLabel>Disability Issuing Authority</FormLabel>
            <Input name="disabilityIssuingAuthority" value={formData.disabilityIssuingAuthority} onChange={handleChange} />
          </FormControl>

          <FormControl id="bankAccount" mb={4}>
            <FormLabel>Bank Account Number</FormLabel>
            <Input name="bankAccount" value={formData.bankAccount} onChange={handleChange} />
          </FormControl>

          <FormControl id="bankIfsc" mb={4}>
            <FormLabel>Bank IFSC Code</FormLabel>
            <Input name="bankIfsc" value={formData.bankIfsc} onChange={handleChange} />
          </FormControl>

        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={handleSave}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Edit_Prsnl_Info_Modal;
