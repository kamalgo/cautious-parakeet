import React, { useState, useEffect } from 'react';
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
  useToast,
  Select
} from "@chakra-ui/react";
// import { editRenewalStudentApi, fetchRecordDetails } from '../../../api/RenewalStudentsApi/RenewalStudentsApi';
import { fetchRecordDetails, editFreshStudentApi } from '../../../api/FreshStudApi/FreshStudApi';

const Edit_Income_FreshStud_Modal = ({ isOpen, onClose, id }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    annualFamilyIncome: '',
    doYouHaveIncomeCertificate: '',
    incomeCertNo: '',
    incomeIssAuthority: '',
    incomeIssuedDate: ''
  });

  useEffect(() => {
    if (isOpen && id) {
      const fetchData = async () => {
        try {
          const response = await fetchRecordDetails(id);
          if (response.success) {
            setFormData(response.data);
          } else {
            toast({
              title: "Error",
              description: response.message || "Failed to fetch income details.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        } catch (error) {
          console.error("Error fetching income details:", error);
          toast({
            title: "Error",
            description: "An error occurred while fetching income details.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      };
      fetchData();
    }
  }, [isOpen, id, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        id,
        ...formData
      };
      await editFreshStudentApi(payload);
      toast({
        title: "Income details updated.",
        description: "The income details have been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose(); // Close the modal after successful submission
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to update income details.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error updating income details:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Income Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Annual Income</FormLabel>
            <Input name="annualFamilyIncome" value={formData.annualFamilyIncome} onChange={handleChange} />
          </FormControl>

{/* 
          <FormControl mt={4}>
            <FormLabel>Do you have income certificate?</FormLabel>
            <Input name="incomeCertYesNo" value={formData.incomeCertYesNo} onChange={handleChange} />
          </FormControl> */}
          

          <FormControl mt={4}>
            <FormLabel>Do you have income certificate?</FormLabel>
            <Select
              name="doYouHaveIncomeCertificate"
              value={formData.doYouHaveIncomeCertificate}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </FormControl>


          <FormControl mt={4}>
            <FormLabel>Income Certificate Number</FormLabel>
            <Input name="incomeCertNo" value={formData.incomeCertNo} onChange={handleChange} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Income Certificate Issuing Authority</FormLabel>
            <Select
              name="incomeIssAuthority"
              value={formData.incomeIssAuthority}
              onChange={handleChange}
            >    
        
              <option value="">Select</option>
              <option value="Sub Divisional Officer(SDO)">Sub Divisional Officer(SDO)</option>
              <option value="Tahsildar">Tahsildar</option>
              <option value="Nayab Tahsildar">Nayab Tahsildar</option>
              <option value="Sub-Divisional Officer/ Dy. Collector">Sub-Divisional Officer/ Dy. Collector</option>
              <option value="Executive magistrate">Executive magistrate</option>
            </Select>
          </FormControl>
          
          <FormControl mt={4}>
            <FormLabel>Income Certificate Issuing Date</FormLabel>
            <Input type="date" name="incomeIssuedDate" value={formData.incomeIssuedDate} onChange={handleChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Edit_Income_FreshStud_Modal;
