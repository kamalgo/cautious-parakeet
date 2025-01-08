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

const Edit_Domi_FreshStud_Modal = ({ isOpen, onClose, id }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    doYouHaveDomicileMaharashtraKarnataka: '',
    doYouHaveDomicileCertificate: '',
    domicileRelationType: '',
    domicileCertNumber: '',
    domicileApplicantName: '',
    domicileIssuedAuthority: '',
    domicileIssuedDate: '',
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
        <ModalHeader>Edit Domicile Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

          <FormControl mt={4}>
            <FormLabel>Do you have Domicile of MH or KA ?</FormLabel>
            <Select
              name="doYouHaveDomicileMaharashtraKarnataka"
              value={formData.doYouHaveDomicileMaharashtraKarnataka}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </FormControl>
          

          <FormControl mt={4}>
            <FormLabel>Do you have Domicile certificate?</FormLabel>
            <Select
              name="doYouHaveDomicileCertificate"
              value={formData.doYouHaveDomicileCertificate}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </FormControl>

    <FormControl mt={4}>
            <FormLabel>Do you have Domicile certificate?</FormLabel>
            <Select
              name="domicileRelationType"
              value={formData.domicileRelationType}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Self">Self</option>
              <option value="Father">Father</option>
              <option value="Brother">Brother</option>
              <option value="Sister">Sister</option>

            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Domicile number</FormLabel>
            <Input
              name="domicileCertNumber"
              value={formData.domicileCertNumber}
              onChange={handleChange}
            >
            </Input>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Applicant Name</FormLabel>
            <Input
              name="domicileApplicantName"
              value={formData.domicileApplicantName}
              onChange={handleChange}
            >
            </Input>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Domicile Certificate Issuing Authority</FormLabel>
            <Select
              name="domicileIssuedAuthority"
              value={formData.domicileIssuedAuthority}
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
            <FormLabel>Domicile Certificate Issuing Date</FormLabel>
            <Input type="date" name="domicileIssuedDate" value={formData.domicileIssuedDate} onChange={handleChange} />
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

export default Edit_Domi_FreshStud_Modal;
