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
  useToast
} from '@chakra-ui/react';
import { editRenewalStudentApi, fetchRecordDetails } from '../../../api/RenewalStudentsApi/RenewalStudentsApi';

const Edit_Prsnl_Renewal_Modal = ({ isOpen, onClose, id }) => {
  
  const toast = useToast(); // Initialize toast
  const [formData, setFormData] = useState({
    candidateName: '',
    email: '',
    whatsappNumber: '',
    referenceId: '',
  });

  // Fetch student data when modal opens or id changes
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
              description: response.message || "Failed to fetch student data.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
          }
        } catch (error) {
          console.error("Error fetching student data:", error);
          toast({
            title: "Error",
            description: "An error occurred while fetching student data.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        }
      };
      fetchData();
    }
  }, [isOpen, id, toast]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await editRenewalStudentApi(formData);
      if (response.success) {
        toast({
          title: "Success",
          description: response.message || "Personal information updated successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        onClose(); // Close the modal on successful update
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
      console.error("Error updating personal information:", error);
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Personal Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="candidateName" mb={4}>
            <FormLabel>Candidate Name (As Per SSC Marksheet)</FormLabel>
            <Input name="candidateName" value={formData.candidateName} onChange={handleChange} />
          </FormControl>

          <FormControl id="email" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" value={formData.email} onChange={handleChange} />
          </FormControl>

          <FormControl id="whatsappNumber" mb={4}>
            <FormLabel>Mobile Number (Student WhatsApp Number)</FormLabel>
            <Input name="whatsappNumber" type="tel" value={formData.whatsappNumber} onChange={handleChange} />
          </FormControl>

          <FormControl id="referenceId" mb={4}>
            <FormLabel>College Reference Id</FormLabel>
            <Input name="referenceId" type="tel" value={formData.referenceId} onChange={handleChange} />
          </FormControl>

          <FormControl id="alternateMobileNumber" mb={4}>
            <FormLabel>Alternate Mobile Number</FormLabel>
            <Input name="alternateMobileNumber" type="tel" value={formData.alternateMobileNumber} onChange={handleChange} />
          </FormControl>

          <FormControl id="Mahadbt_Username" mb={4}>
            <FormLabel>MahaDBT Username</FormLabel>
            <Input name="Mahadbt_Username" type="tel" value={formData.Mahadbt_Username} onChange={handleChange} />
          </FormControl>

          <FormControl id="Mahadbt_Password" mb={4}>
            <FormLabel>MahaDBT Password</FormLabel>
            <Input name="Mahadbt_Password" type="tel" value={formData.Mahadbt_Password} onChange={handleChange} />
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

export default Edit_Prsnl_Renewal_Modal;
